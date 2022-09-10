window.onload = function () {
  google.accounts.id.initialize({
    client_id: "350532626407-nsnjic5jllfm5utanr5hnmjuaise2s41.apps.googleusercontent.com",
    login_uri: "http://localhost:7500/auth/google/callback" // We choose to handle the callback in server side, so we include a reference to a endpoint that will handle the response
  });
  // You can skip the next instruction if you don't want to show the "Sign-in" button
  google.accounts.id.renderButton(
    document.getElementById("btn-sign-in-with-Google"), // Ensure the element exist and it is a div to display correctly
    { theme: "outline", size: "large" }  // Customization attributes
  );
  google.accounts.id.prompt(); // Display the One Tap dialog
}