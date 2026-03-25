import { getPayload } from 'payload'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import dotenv from 'dotenv'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const rootDir = path.resolve(dirname, '..')

// Load environment variables manually
dotenv.config({ path: path.resolve(rootDir, '.env') })

const courses = [
  // IGCSE Courses
  { name: "IGCSE Biology", level: "IGCSE" },
  { name: "IGCSE Business Studies", level: "IGCSE" },
  { name: "IGCSE Chemistry", level: "IGCSE" },
  { name: "IGCSE Computer Science", level: "IGCSE" },
  { name: "IGCSE English - First Language", level: "IGCSE" },
  { name: "IGCSE Environmental Management", level: "IGCSE" },
  { name: "IGCSE Geography", level: "IGCSE" },
  { name: "IGCSE History", level: "IGCSE" },
  { name: "IGCSE Mathematics", level: "IGCSE" },
  { name: "IGCSE Physics", level: "IGCSE" },
  { name: "IGCSE Travel and Tourism", level: "IGCSE" },

  // IELTS Course
  { name: "IELTS Training (English Language Course)", level: "IELTS" },

  // Level 3 Courses
  { name: "Level 3 Accountancy", level: "Level 3", credits: "60 Credits" },
  { name: "Level 3 Business Management", level: "Level 3", credits: "120 Credits" },
  { name: "Level 3 Business Studies", level: "Level 3", credits: "60 Credits" },
  { name: "Level 3 Employability and Workplace Skills", level: "Level 3", credits: "60 Credits" },
  { name: "Level 3 Engineering", level: "Level 3", credits: "60 Credits" },
  { name: "Level 3 Health & Social Care", level: "Level 3" },
  { name: "Level 3 Introduction to Management", level: "Level 3", credits: "60 Credits" },
  { name: "Level 3 People and Organisations", level: "Level 3", credits: "60 Credits" },
  { name: "Level 3 Information Technology", level: "Level 3", credits: "60 Credits" },

  // Level 4 Courses
  { name: "Level 4 Accounting and Business", level: "Level 4" },
  { name: "Level 4 Business Management", level: "Level 4" },
  { name: "Level 4 Entrepreneurship", level: "Level 4" },
  { name: "Level 4 Health & Social Care Management", level: "Level 4" },
  { name: "Level 4 Tourism and Hospitality Management", level: "Level 4" },
  { name: "Level 4 Human Resource Management", level: "Level 4" },
  { name: "Level 4 Logistics and Supply Chain Management", level: "Level 4" },
  { name: "Level 4 Information Technology", level: "Level 4" },
  { name: "Level 4 IT and E-Commerce", level: "Level 4" },
  { name: "Level 4 IT and Networking", level: "Level 4" },
  { name: "Level 4 IT and Web Design", level: "Level 4" },
  { name: "Level 4 Leadership and Teamwork", level: "Level 4" },
  { name: "Level 4 Sales and Marketing", level: "Level 4" },

  // Level 5 Courses
  { name: "Level 5 Business Management", level: "Level 5" },
  { name: "Level 5 Health & Social Care Management", level: "Level 5" },
  { name: "Level 5 Tourism & Hospitality Management", level: "Level 5" },
  { name: "Level 5 Information Technology", level: "Level 5" },
  { name: "Level 5 IT - E-Commerce", level: "Level 5" },
  { name: "Level 5 IT - Networking", level: "Level 5" },
  { name: "Level 5 IT - Web Design", level: "Level 5" },
  { name: "Level 5 Teacher Training", level: "Level 5" },

  // Level 4 & 5 Combined Courses
  { name: "Level 4 & 5 Accounting and Business", level: "Level 4 & 5" },
  { name: "Level 4 & 5 Business Management", level: "Level 4 & 5" },
  { name: "Level 4 & 5 Entrepreneurship and Management", level: "Level 4 & 5" },
  { name: "Level 4 & 5 Health & Social Care Management", level: "Level 4 & 5" },
  { name: "Level 4 & 5 Tourism and Hospitality Management", level: "Level 4 & 5" },
  { name: "Level 4 & 5 Human Resource Management", level: "Level 4 & 5" },
  { name: "Level 4 & 5 Logistics and Supply Chain Management", level: "Level 4 & 5" },
  { name: "Level 4 & 5 Information Technology", level: "Level 4 & 5" },
  { name: "Level 4 & 5 IT and E-Commerce", level: "Level 4 & 5" },
  { name: "Level 4 & 5 IT and Networking", level: "Level 4 & 5" },
  { name: "Level 4 & 5 IT and Web Design", level: "Level 4 & 5" },
  { name: "Level 4 & 5 Leadership and Teamwork", level: "Level 4 & 5" },
  { name: "Level 4 & 5 Sales and Marketing", level: "Level 4 & 5" },

  // Level 6 Courses
  { name: "Level 6 Business Management", level: "Level 6" },
  { name: "Level 6 Professional Sales Management", level: "Level 6" },

  // Level 7 Courses
  { name: "Level 7 Human Resource Management", level: "Level 7" },
  { name: "Level 7 Strategic Management and Leadership", level: "Level 7" },
  { name: "Level 7 Strategic Sales Management", level: "Level 7" },
  { name: "Level 7 Project Management", level: "Level 7" },
  { name: "Level 7 Organisational Psychology and Business", level: "Level 7" },
];

async function seed() {
  try {
    console.log('Loading Payload config...')
    const configPath = path.resolve(rootDir, 'payload.config.ts')
    const configModule = await import(pathToFileURL(configPath).href)
    const config = await (configModule.default || configModule)
    
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })

    console.log('Seeding courses...')
    for (const course of courses) {
      await payload.create({
        collection: 'CourseItems',
        data: course,
      })
      console.log(`Added: ${course.name}`)
    }

    console.log('Successfully seeded all courses.')
  } catch (err) {
    console.error('Seed failed:', err)
  }
  process.exit(0)
}

seed()
