var chai = require("chai")
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);



describe("check js' math",function(){
	it("returns 4 when adding 2 and 2", function(){
		expect(2+2).to.be.equal(4);
	})
});

describe("test how long it should take setTimeout", function(){
	it("returns 1000 milliseconds", function(done){
		var start = new Date();
		setTimeout(function(){
			var duration = new Date - start;
			expect(duration).to.be.closeTo(1000,10);
			done();
		}, 1000)
	});
});

describe("ensure that foreach calls every element", function(){
	it("returns the number of elements in an array", function(){
		var arr = [10,2,3,4,5,21];
		function func(val){
			console.log(val);
		}
		func = chai.spy(func);
		arr.forEach(func);
		expect(func).to.have.been.called.exactly(arr.length);
	})
})
