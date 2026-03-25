# CMS Editor Guide

This guide explains how to update the website content in Payload Admin without touching code.

## 1. Log In

Open the admin area:

```text
/admin
```

Sign in with your admin account.

## 2. How The Content Is Organised

The website content is mainly managed in these areas:

- `Site Settings`
- `Home Page`
- `Pages`
- `Courses`
- `Programmes`
- `Media`

## 3. What To Edit First

If you are updating the website for the first time, use this order:

1. `Site Settings`
2. `Media`
3. `Home Page`
4. `Pages`
5. `Courses`
6. `Programmes`

## 4. Site Settings

Open `Site Settings` to update information used across the website.

You can edit:

- website name
- short brand name
- phone number
- email address
- WhatsApp number
- physical address
- office hours
- top navigation links
- footer links
- footer description
- footer disclaimer

Use this area whenever contact details or shared navigation need to change.

## 5. Media

Open `Media` to upload images before using them on pages.

Best practice:

- upload images first
- give each image a clear `alt` text
- use clear file names when possible

## 6. Home Page

Open `Home Page`.

You can edit:

- hero title
- hero subtitle
- hero image
- trust indicators
- statistics
- feature cards
- partnership section
- homepage call-to-action buttons

If you want to refresh the homepage, this is the main place to work.

## 7. Pages

Open `Pages`.

Each page is identified by a `slug`.

Current slugs:

- `about`
- `services`
- `why-choose`
- `contact`
- `courses`
- `study`

Inside each page you can edit content such as:

- hero title
- hero subtitle
- section titles
- paragraphs
- feature cards
- bullet lists
- CTA text and links

## 8. Courses

Open `Courses`.

This controls the course listing shown on the Courses page.

You can add or edit:

- course name
- level
- credits

## 9. Programmes

Open `Programmes`.

This controls the programme cards shown on the Study page.

You can edit:

- programme level
- title
- description
- feature list

## 10. Safe Editing Tips

Use these habits to avoid mistakes:

- keep titles short and clear
- keep subtitles readable and not too long
- check spelling before saving
- upload the image before linking it on a page
- avoid deleting list items unless you want them removed from the website
- when editing links, make sure internal links look like `/contact`

## 11. After Saving

After you click `Save`:

1. open the page on the website
2. refresh the page
3. confirm the content looks correct
4. test any links you changed

## 12. Quick Examples

### Change the phone number everywhere

Go to `Site Settings` and update:

- `contactPhone`
- `whatsappNumber` if needed

### Change the homepage hero image

1. upload the new image in `Media`
2. open `Home Page`
3. change the `heroImage`
4. save and refresh the homepage

### Change the About page text

1. open `Pages`
2. open the entry with slug `about`
3. update the hero text or section text
4. save and refresh the About page

### Add a new course

1. open `Courses`
2. create a new entry
3. add the course name, level, and credits
4. save and refresh the Courses page

## 13. If Something Looks Wrong

Check these things first:

- was the correct page entry edited?
- was the content saved?
- was the page refreshed on the frontend?
- was the image uploaded before being selected?
- was a link entered correctly?

If a section becomes empty after editing, it usually means a required value was removed or a list item was left blank.

## 14. Recommended Workflow

For regular content updates:

1. prepare text and images first
2. upload images in `Media`
3. update the relevant page or settings
4. save
5. preview the live page
6. test buttons and links

## 15. Who Should Use What

- Use `Site Settings` for shared business details
- Use `Home Page` for homepage sections
- Use `Pages` for standard page content
- Use `Courses` for the course catalogue
- Use `Programmes` for study programme cards
- Use `Media` for images

