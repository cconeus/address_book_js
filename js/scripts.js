function Contact(firstName,lastName){
    debugger;
  this.firstName = firstName
  this.lastName = lastName
  this.addresses = []
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address(addressType, street, city, state) {
    this.addressType = addressType;
    this.street = street;
    this.city = city;
    this.state = state;

}

Address.prototype.fullAddress = function() {
  return this.addressType + ", " + this.street + ", " + this.city + ", " + this.state;
}

function resetFields(){
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
  $("div.new-address").not(':first').remove();
}

$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                '<div class="form-group">' +
                                '<label for="new-type">Address Type</label>' +
                                '<select class="new-type">' +
                                  '<option value="Home">Home</option>' +
                                  '<option value="Work">Work</option>' +
                                  '<option value="Second Home">Second Home</option>' +
                                '</select>' +
                                '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
});

$("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var addressType = $(this).find(".new-type").val();
      console.log("addressType");

      var newAddress = new Address(addressType, inputtedStreet, inputtedCity, inputtedState)
      newContact.addresses.push(newAddress);
    });


    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").fadeIn(1000);

      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);

      $("ul#addresses").text("");

      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });

    resetFields();
  });
});
