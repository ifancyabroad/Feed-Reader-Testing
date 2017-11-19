/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All tests are placed within the $() function,
 * since some of these tests require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions, 
    * the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		 it('has a url', function() {
			 allFeeds.forEach(function(feed) {
				 expect(feed.url).toBeTruthy();
			 });
		 });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('has a name', function() {
			 allFeeds.forEach(function(feed) {
				 expect(feed.name).toBeTruthy();
			 });
		 });
    });


    /* Test suite for The menu */
	describe('The menu', function() {
		const body = $('body');
		const menuIcon = $('.menu-icon-link');

        /* This test ensures the menu element is
         * hidden by default.
         */
		it('is hidden by default', function() {
			 expect(body.hasClass('menu-hidden')).toBeTruthy();
		});

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		it('changes visibility when clicked', function() {
			menuIcon.trigger('click');
			expect(body.hasClass('menu-hidden')).toBeFalsy();
			menuIcon.trigger('click');
			expect(body.hasClass('menu-hidden')).toBeTruthy();
			
		});
	});

    /* Test suite for Initial Entries */
	describe('Initial Entries', function() {
		const feed = $('.feed');

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
		 
		// loadFeed is run first as it is asynchronous
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});
		
		// Check to ensure there is an element within the feed container
		it('should have at least a single entry element', function(done) {
			expect(feed.children().hasClass('entry-link')).toBeTruthy();
			done();
		});
	});

    /* Test suite for New Feed Selection */
	describe('New Feed Selection', function() {
		const feed = $('.feed');
		let entries = [];

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
		 * It does this by checking the HTML of the first feed with that
		 * of the second.
         */
		 
		// loadFeed is run first as it is asynchronous. It is run twice to check.
		beforeEach(function(done) {
			loadFeed(0, function() {
				entries.push(feed.children().html());
				loadFeed(1, function() {
					entries.push(feed.children().html());
					done();
				});
			});
		});
		
		// Checks the html is different.		
		it('should have different content', function(done) {
			expect(entries[0] === entries[1]).toBeFalsy();
			done();
		});
		 
	});
}());
