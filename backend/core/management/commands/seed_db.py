import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from core.models import *  # Import all models
from faker import Faker

fake = Faker()
User = get_user_model()

class Command(BaseCommand):
    help = "Seeds the database with sample data"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS("Seeding database..."))

        # Create 5 users
        users = [User.objects.create(full_name=fake.name(), email=fake.email()) for _ in range(5)]

        # Create 5 organizations
        organizations = [
            Organization.objects.create(
                name=fake.company(),
                org_type=random.choice(["Tech", "Finance", "Education"]),
                description=fake.text(),
            ) for _ in range(5)
        ]

        # Create 5 events
        events = [
            Event.objects.create(
                title=fake.sentence(),
                description=fake.text(),
                event_type=random.choice(["workshop", "webinar", "hackathon", "competition"]),
                start_datetime=fake.future_datetime(),
                end_datetime=fake.future_datetime(),
                location=fake.city(),
                organizer=random.choice(users),
                partner_org=random.choice(organizations),
                attendees=random.randint(1, 100),
                is_public=True,
                is_approved=True,
            ) for _ in range(5)
        ]

        # Create 5 event registrations
        event_registrations = [
            EventRegistration.objects.create(
                user=random.choice(users),
                event=random.choice(events),
                role=fake.job(),
                is_attended=random.choice([True, False]),
            ) for _ in range(5)
        ]

        # Create 5 projects
        projects = [
            Project.objects.create(
                title=fake.sentence(),
                description=fake.text(),
                created_by=random.choice(users),
                partner_org=random.choice(organizations),
                status=random.choice(["ongoing", "completed", "pending"]),
            ) for _ in range(5)
        ]

        # Create 5 project members
        project_members = [
            ProjectMember.objects.create(
                project=random.choice(projects),
                user=random.choice(users),
                role=fake.job(),
            ) for _ in range(5)
        ]

        # Create 5 badges
        badges = [
            Badge.objects.create(
                name=fake.word().capitalize(),
                description=fake.text(),
            ) for _ in range(5)
        ]

        # Create 5 user badges
        user_badges = [
            UserBadge.objects.create(
                user=random.choice(users),
                badge=random.choice(badges),
            ) for _ in range(5)
        ]

        # Create 5 comments
        comments = [
            Comment.objects.create(
                user=random.choice(users),
                target_type="event",  # Placeholder target
                target_id=random.randint(1, 5),
                content=fake.text(),
            ) for _ in range(5)
        ]

        # Create 5 likes
        likes = [
            Like.objects.create(
                user=random.choice(users),
                content_type=ContentType.objects.get_for_model(Event),
                object_id=random.randint(1, 5),
            ) for _ in range(5)
        ]

        # Create 5 resources
        resources = [
            Resource.objects.create(
                title=fake.sentence(),
                description=fake.text(),
                resource_type=random.choice(["document", "video", "link", "other"]),
                uploaded_by=random.choice(users),
                organization=random.choice(organizations),
            ) for _ in range(5)
        ]

        self.stdout.write(self.style.SUCCESS("Database seeding complete!"))
