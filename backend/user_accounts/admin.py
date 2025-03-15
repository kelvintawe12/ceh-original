from django.contrib import admin

# Import the User and ProfilePhoto models from the user_accounts app
from user_accounts.models import User, ProfilePhoto

# Register the User model to enable admin management of user accounts
admin.site.register(User)
# Register the ProfilePhoto model to allow admins to manage user profile images
admin.site.register(ProfilePhoto)
