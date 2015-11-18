var chai = require("chai")
var expect = chai.expect;
var spies = require('chai-spies');
var Page = require("../models/").Page
chai.use(spies);


describe("Page model", function(){	
	
	var page;
	beforeEach(function(){
		page = new Page();
	});
	describe("Validations", function(){
		
		

		it("Errors without title", function(done){
			page.validate(function(err){
				expect(err.errors.title).to.be.an("object");
				done();
			});
		});
		it("Errors without content", function(done){
			page.validate(function(err){
				expect(err.errors.content).to.be.an("object");
				done();
			});
		});
	});
	describe("Statics", function(){

		beforeEach(function(done){
			Page.create({
		        title: 'foo',
		        content: 'bar',
		        tags: ['foo', 'bar']
	    	}, done);
		});

		afterEach(function(done) {
			Page.remove({}, done)
		});

		describe("findByTag", function(){

			it("Returns pages with a search tag", function(done){
				Page.findByTag("bar")
					.then(function(pages){
						expect(pages).to.have.length(1);
						done();
					})
					.then(null, done);
			});
			it("Does not return pages without a search tag", function(done){
				Page.findByTag("blah")
					.then(function(pages){
						expect(pages).to.have.length(0);
						done();
					})
					.then(null, done);
			});
		});
	});
	describe("Methods", function(){
		var page;
		beforeEach(function(done){
			Page.create({
		        title: 'foo1',
		        content: 'bar',
		        tags: ['foo', 'bar1']
	    	}).then(function(firstcreatedPage){
	    		return Page.create({
		        	title: 'foo2',
		        	content: 'bar',
		        	tags: ['foo1', 'bar']
	    		});
	    	}).then(function(secondCreatedPage){
				page = new Page({
					title: "test document",
					content: "this doesn't matter",
					tags: ["foo", "this shouldn't matter"]
				});
				return page.save();	
	    	}).then(function(){
	    		done();
	    	})
		});

		afterEach(function(done) {
			Page.remove({}, done)
		});
		
		describe("findSimilar", function(){
			it("Does not return itself", function(done){
				page.findSimilar().then(function(similarPages){
					expect(similarPages).to.have.length(1)
					done();
				}).then(null, done);

			});
			it("Finds pages with similar tags", function(done){
				page.findSimilar().then(function(similarPages){
					expect(similarPages).to.have.length(1)
					done();
				}).then(null, done);
			});
			it("Does not get pages without any similar tags", function(done){
				page.findSimilar().then(function(similarPages){
					expect(similarPages).to.have.length(1)
					done();
				}).then(null, done);
			});
		});
	});
	describe("Virtuals", function(){
		var page;
		beforeEach(function(done){
			page = new Page({
		        title: 'foo1',
		        content: 'bar',
		        tags: ['foo', 'bar1']
	    	})
			page.save()
	    	.then(function(newPage){
	    		done();
	    	})
		});

		afterEach(function(done) {
			Page.remove({}, done)
		});

		describe("route", function(){
			it("returns the url name with /wiki/ before it", function(){
				expect(page.route).to.equal('/wiki/' + page.urlTitle)
			});
		})
	});

	describe("Hooks", function(){

		var page;
		beforeEach(function(done){
			page = new Page({
		        title: 'foo1',
		        content: 'bar',
		        tags: ['foo', 'bar1']
	    	})
			page.save()
	    	.then(function(newPage){
	    		done();
	    	})
		});

		afterEach(function(done) {
			Page.remove({}, done)
		});

		it("Sets urlTitle based on title before validating",function(){
			expect(page.urlTitle).to.be.equal("foo1")
		});
	})
});

// describe("User model", function(){
// 	describe("Statics", function(){

// 	});
// });