# Generated by Django 3.0.5 on 2020-04-25 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('host', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='double_jeopardy_answers',
            field=models.FileField(upload_to='games/'),
        ),
        migrations.AlterField(
            model_name='game',
            name='double_jeopardy_questions',
            field=models.FileField(upload_to='games/'),
        ),
        migrations.AlterField(
            model_name='game',
            name='jeopardy_answers',
            field=models.FileField(upload_to='games/'),
        ),
        migrations.AlterField(
            model_name='game',
            name='jeopardy_questions',
            field=models.FileField(upload_to='games/'),
        ),
    ]
