'use strict';
const Book = require('../model');
const database = require('../database');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

let listBookIds = [];

before(done => {
  console.log('Loading test...');
  database
    .connect()
    .then(() => {
      return Book.remove();
    })
    .then(() => {
      done();
    })
    .catch(error => done(error));
});

after(() => {
  console.log('Test book completed');
});

describe('POST /books', () => {
  it('OK, create How to Win Friends & Influence People', done => {
    request(app)
      .post(`/books`)
      .send({
        title: 'How to Win Friends & Influence People',
        author: 'Dale Carnegie',
        numberPages: 320,
        publisher: 'Dale Carnegie'
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('book');
        expect(body.book.title).to.equals(
          'How to Win Friends & Influence People'
        );
        done();
      })
      .catch(error => done(error));
  });

  it('OK, create The Alchemist', done => {
    request(app)
      .post(`/books`)
      .send({
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        numberPages: 224,
        publisher: 'Paulo Coelho'
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('book');
        expect(body.book.title).to.equals('The Alchemist');
        done();
      })
      .catch(error => done(error));
  });

  it('OK, create Cà Phê Cùng Tony', done => {
    request(app)
      .post(`/books`)
      .send({
        title: 'Cà Phê Cùng Tony',
        author: 'Tony',
        numberPages: 224,
        publisher: 'NXB Trẻ'
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('book');
        expect(body.book.title).to.equals('Cà Phê Cùng Tony');
        done();
      })
      .catch(error => done(error));
  });

  it('OK, create Tony Buổi Sáng - Trên Đường Băng', done => {
    request(app)
      .post(`/books`)
      .send({
        title: 'Tony Buổi Sáng - Trên Đường Băng',
        author: 'Tony',
        numberPages: 224,
        publisher: 'NXB Trẻ'
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('book');
        expect(body.book.title).to.equals('Tony Buổi Sáng - Trên Đường Băng');
        done();
      })
      .catch(error => done(error));
  });
});

describe('GET /books', () => {
  it('OK, get list books', done => {
    request(app)
      .get('/books')
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('books');
        expect(body.books.length).to.greaterThan(0);
        // Save list book ids
        listBookIds = body.books.map(book => {
          return book._id;
        });
        done();
      })
      .catch(error => done(error));
  });

  it('OK, get list books with select field title', done => {
    request(app)
      .get('/books?fields=title')
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('books');
        expect(body.books.length).to.greaterThan(0);
        expect(body.books[0]).has.ownProperty('title')
        expect(body.books[0]).to.not.has.ownProperty('author')
        done();
      })
      .catch(error => done(error));
  });
});

describe('GET /books/id', () => {
  it('OK, get book', done => {
    request(app)
      .get(`/books/${listBookIds[0]}`)
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('book');
        expect(body.book.title).to.equals('How to Win Friends & Influence People');
        done();
      })
      .catch(error => done(error));
  });

  it('OK, get book with select field title', done => {
    request(app)
      .get(`/books/${listBookIds[0]}?fields=title`)
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('book');
        expect(body.book.title).to.equals('How to Win Friends & Influence People');
        expect(body.book).to.not.has.ownProperty('author');
        done();
      })
      .catch(error => done(error));
  });
});

describe('PUT /books/id', () => {
  it('OK, update book', done => {
    request(app)
      .put(`/books/${listBookIds[2]}`)
      .send({
        title: 'Tony Buổi Sáng - Trên Đường Băng 2',
        author: 'Tony 2',
        numberPages: 224,
        publisher: 'NXB Trẻ'
      })
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('book');
        expect(body.book.title).to.equals('Tony Buổi Sáng - Trên Đường Băng 2');
        expect(body.book.author).to.equals('Tony 2');
        done();
      })
      .catch(error => done(error));
  });
});

describe('DELETE /books/id', () => {
  it('OK, delete book', done => {
    request(app)
      .delete(`/books/${listBookIds[3]}`)
      .then(res => {
        const body = res.body;
        expect(res.statusCode).to.equals(200);
        expect(body).to.contain.property('book');
        done();
      })
      .catch(error => done(error));
  });
});
