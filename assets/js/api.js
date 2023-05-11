var apiKeyForm =  document.getElementById('api-key-form');

      var openWeatherMapAPIKey = '';
      var otherAPIKey = '';
      // Get any saved keys on page load
      loadAPIKeys();

      // Loads API keys from localStorage
      //   If they keys exist, then the form is hidden
      function loadAPIKeys() {
        var openWeatherMapAPIKey = localStorage.getItem('openWeatherMapAPIKey');
        var otherAPIKey = localStorage.getItem('otherAPIKey');

        // require both api keys before hiding the fields
        if (!openWeatherMapAPIKey || !otherAPIKey) {
          apiKeyForm.style.display = 'flex';
          apiKeyForm.addEventListener('submit', handleFormSubmit);
        } else {
          apiKeyForm.style.display = 'none';
          apiKeyForm.removeEventListener('submit', handleFormSubmit);
        }
      }

      // Saves the API keys to localStorage
      function saveAPIKeys(openWeatherMapAPIKey, otherAPIKey) {
        localStorage.setItem('openWeatherMapAPIKey', openWeatherMapAPIKey);
        localStorage.setItem('otherAPIKey', otherAPIKey);
      }

      // When the form is submitted, save the keys to localStorage and then load them into the app
      function handleFormSubmit(event) {
        event.preventDefault();
        var apiKey1 = document.getElementById('api-key-1').value.trim();
        var apiKey2 = document.getElementById('api-key-2').value.trim();

        saveAPIKeys(apiKey1,apiKey2);
        loadAPIKeys();
      }


