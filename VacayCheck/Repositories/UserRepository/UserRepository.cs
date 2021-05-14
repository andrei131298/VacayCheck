using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VacayCheck.Models;
using VacayCheck.Contexts;
using VacayCheck.Mapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using System.Configuration;

namespace VacayCheck.Repositories.UserRepository
{
    public class UserRepository : ControllerBase, IUserRepository
    {
        public Context _context { get; set; }
        private readonly AppSettings _appSettings;

        public UserRepository(Context context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            this._appSettings = appSettings.Value;

        }
        public User Get(Guid Id)
        {
            return _context.Users.SingleOrDefault(x => x.id == Id);
        }

        public List<User> GetAll()
        {
            return _context.Users.ToList();
        }

        public User Update(User user)
        {
            _context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return user;
        }

        public User Delete(User user)
        {
            var result = _context.Remove(user);
            _context.SaveChanges();
            return result.Entity;
        }

        public User Register(RegisterRequest request)
        {
            var entity = request.ToUserExtension();
            var userAlreadyExists = _context.Users.Any(x => x.email == request.email);
            if (userAlreadyExists)
            {
                return null;
            }
            else
            {
                var result = _context.Add<User>(entity);
                _context.SaveChanges();
                
                MailMessage mailMessage = new MailMessage("travelcheckmail@gmail.com", request.email);
                mailMessage.From = new MailAddress("travelcheckmail@gmail.com", "Travel Check");

                // Specify the email body
                mailMessage.Body = "Verification link: https://localhost:44397/email-verification/" + result.Entity.id;
                // Specify the email Subject
                mailMessage.Subject = "TravelCheck e-mail verification";

                // Specify the SMTP server name and post number
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                // Specify your gmail address and password
                smtpClient.UseDefaultCredentials = false;

                smtpClient.Credentials = new System.Net.NetworkCredential()
                {
                    UserName = "travelcheckmail@gmail.com",
                    Password = "tenismen13"
                };
                // Gmail works on SSL, so set this property to true
                smtpClient.EnableSsl = true;
                // Finall send the email message using Send() method
                smtpClient.Send(mailMessage);

                return result.Entity;
            }

        }
        public User GetByUserAndPassword(string email, string password)
        {
            return _context.Users.Where(x => x.email == email && x.password == password).FirstOrDefault();
        }

        private string GenerateJwtForUser(User user)
        {
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new[] { new Claim("id", user.id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public AuthenticationResponse Login(AuthenticationRequest request)
        {
            // find user
            var user = GetByUserAndPassword(request.email, request.password);
            if (user == null)
                return null;

            // attach token
            var token = GenerateJwtForUser(user);

            // return user & token
            return new AuthenticationResponse
            {
                id = user.id,
                email = user.email,
                token = token,
                isMailVerificated = user.isMailVerificated
            };
        }
    }
}

