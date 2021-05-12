﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VacayCheck.Contexts;

namespace VacayCheck.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("VacayCheck.Models.Apartment", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("apartmentName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("maxPersons")
                        .HasColumnType("int");

                    b.Property<int>("numberOfRooms")
                        .HasColumnType("int");

                    b.Property<int>("pricePerNight")
                        .HasColumnType("int");

                    b.Property<Guid>("propertyId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("id");

                    b.HasIndex("propertyId");

                    b.ToTable("Apartments");
                });

            modelBuilder.Entity("VacayCheck.Models.City", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("cityName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("VacayCheck.Models.ExchangeRequest", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("checkIn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("checkOut")
                        .HasColumnType("datetime2");

                    b.Property<int>("numberOfPersons")
                        .HasColumnType("int");

                    b.Property<Guid>("requesterApartmentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("requesterId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("responderApartmentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("responderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("status")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("ExchangeRequests");
                });

            modelBuilder.Entity("VacayCheck.Models.Favourite", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("propertyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("userId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("id");

                    b.HasIndex("propertyId");

                    b.HasIndex("userId");

                    b.ToTable("Favourites");
                });

            modelBuilder.Entity("VacayCheck.Models.Owner", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("bankAccount")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("birthDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("firstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("lastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("sex")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Owners");
                });

            modelBuilder.Entity("VacayCheck.Models.Photo", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("apartmentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("path")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("apartmentId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("VacayCheck.Models.Property", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("cityName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("mapLatitude")
                        .HasColumnType("float");

                    b.Property<double>("mapLongitude")
                        .HasColumnType("float");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("numberOfStars")
                        .HasColumnType("int");

                    b.Property<string>("photo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("street")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("type")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("userId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("id");

                    b.HasIndex("userId");

                    b.ToTable("Properties");
                });

            modelBuilder.Entity("VacayCheck.Models.Reservation", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("apartmentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("checkIn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("checkOut")
                        .HasColumnType("datetime2");

                    b.Property<int>("numberOfPersons")
                        .HasColumnType("int");

                    b.Property<bool>("paidWithCard")
                        .HasColumnType("bit");

                    b.Property<int>("price")
                        .HasColumnType("int");

                    b.Property<string>("review")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("userId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("id");

                    b.HasIndex("apartmentId");

                    b.HasIndex("userId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("VacayCheck.Models.User", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("bankAccount")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("birthDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("cityName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("firstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isMailVerificated")
                        .HasColumnType("bit");

                    b.Property<bool>("isOwner")
                        .HasColumnType("bit");

                    b.Property<string>("lastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("phoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("profilePhoto")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("sex")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("VacayCheck.Models.Apartment", b =>
                {
                    b.HasOne("VacayCheck.Models.Property", "property")
                        .WithMany("apartment")
                        .HasForeignKey("propertyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("property");
                });

            modelBuilder.Entity("VacayCheck.Models.Favourite", b =>
                {
                    b.HasOne("VacayCheck.Models.Property", "property")
                        .WithMany()
                        .HasForeignKey("propertyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VacayCheck.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("property");

                    b.Navigation("user");
                });

            modelBuilder.Entity("VacayCheck.Models.Photo", b =>
                {
                    b.HasOne("VacayCheck.Models.Apartment", "apartment")
                        .WithMany()
                        .HasForeignKey("apartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("apartment");
                });

            modelBuilder.Entity("VacayCheck.Models.Property", b =>
                {
                    b.HasOne("VacayCheck.Models.User", "user")
                        .WithMany("property")
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("user");
                });

            modelBuilder.Entity("VacayCheck.Models.Reservation", b =>
                {
                    b.HasOne("VacayCheck.Models.Apartment", "apartment")
                        .WithMany("reservation")
                        .HasForeignKey("apartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VacayCheck.Models.User", "user")
                        .WithMany("reservation")
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("apartment");

                    b.Navigation("user");
                });

            modelBuilder.Entity("VacayCheck.Models.Apartment", b =>
                {
                    b.Navigation("reservation");
                });

            modelBuilder.Entity("VacayCheck.Models.Property", b =>
                {
                    b.Navigation("apartment");
                });

            modelBuilder.Entity("VacayCheck.Models.User", b =>
                {
                    b.Navigation("property");

                    b.Navigation("reservation");
                });
#pragma warning restore 612, 618
        }
    }
}
