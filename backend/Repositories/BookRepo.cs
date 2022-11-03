using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookLab.Models.Database;

namespace BookLab.Repositories
{
    public interface IBookRepo
    {
        Book GetBookById(int bookId);
        Book AddBook(Book newBook);
        IEnumerable<Book> GetAllBooks();
    }

    public class BookRepo : IBookRepo
    {
        private readonly BookLabDbContext _context;

        public BookRepo(BookLabDbContext context)
        {
            _context = context;
        }

        public Book GetBookById(int bookId)
        {
            return _context.Books
                .Include(b => b.Authors)
                .Include(b => b.Genres)
                .Single(b => b.Id == bookId);
        }

        public Book AddBook(Book newBook)
        {
            var insertedBook = _context.Books.Add(newBook);
            _context.SaveChanges();

            return insertedBook.Entity;
        }

        public IEnumerable<Book> GetAllBooks()
        {
            return _context
                .Books
                .OrderBy(b => b.Title);
        }
    }
}