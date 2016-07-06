#!/usr/bin/env casperjs

var system  = require('system');
var helpers = require('./helpers');
var Casper  = require('casper');
var casper  = helpers.buildCasper(Casper);

var EMAIL_PASSWORD_USERNAME = system.env.EMAIL_PASSWORD_USERNAME;
var EMAIL_PASSWORD_PASSWORD = system.env.EMAIL_PASSWORD_PASSWORD;

if(!EMAIL_PASSWORD_USERNAME || !EMAIL_PASSWORD_PASSWORD)  {
  console.log('Missing required env: EMAIL_PASSWORD_USERNAME or EMAIL_PASSWORD_PASSWORD');
  casper.exit(1);
}

helpers.thenWithErrors(casper, function(){
  return casper.click('.auth__button--email');
})

casper.waitForSelector(".auth__form")

helpers.thenWithErrors(casper, function(){
  casper.fill('.auth__form', {
    'email': EMAIL_PASSWORD_USERNAME,
    'password': EMAIL_PASSWORD_PASSWORD
  })
  casper.click(".md-raised")
})

helpers.assertOnOctobluDashboard(casper);
helpers.thenWithErrors(casper, function(){
  helpers.logout(casper);
});
helpers.thenWithErrors(casper, function(){
  casper.echo("success");
  casper.exit(0);
})

casper.run();
