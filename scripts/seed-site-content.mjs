import { getPayload } from 'payload'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import dotenv from 'dotenv'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const rootDir = path.resolve(dirname, '..')

dotenv.config({ path: path.resolve(rootDir, '.env') })

const homeSettings = {
  heroTitle: 'Your Gateway to UK Higher Education',
  heroSubtitle:
    'Access affordable, accredited BA and MBA pathway programmes from Online Business School (UK). Complete your qualification for less than £6,000 with full student support from EnidPath International.',
  stats: [
    { value: '£6,000', label: 'Full Programme Cost', sublabel: 'Less than' },
    { value: '100%', label: 'Online Learning' },
    { value: 'UK', label: 'Accredited by OBS' },
    { value: '24/7', label: 'Student Support' },
  ],
  trustIndicators: [
    { text: 'UK Accredited Programmes' },
    { text: 'OFQUAL Regulated' },
    { text: 'Study Online, Anywhere' },
    { text: 'BA & MBA Pathways' },
  ],
  featuresSectionTitle: 'Why Partner with EnidPath International?',
  featuresSectionSubtitle:
    'We connect ambitious students with world-class UK education through our partnership with Online Business School.',
  features: [
    {
      icon: 'book-open',
      title: 'UK Accredited Qualifications',
      description:
        'Access quality BA and MBA pathway programmes delivered by Online Business School (UK), regulated under the OFQUAL and QCF frameworks.',
    },
    {
      icon: 'users',
      title: 'Dedicated Student Support',
      description:
        'Receive personalised guidance from application through graduation. Our team is here to support your educational journey every step of the way.',
    },
    {
      icon: 'globe',
      title: 'Study From Anywhere',
      description:
        'Flexible online learning that fits your schedule. Balance your studies with work and personal commitments without relocating.',
    },
  ],
  partnershipTitle: 'In Partnership with Online Business School (UK)',
  partnershipBody:
    'EnidPath International is an authorised recruitment and student support partner. All BA and MBA pathway programmes are delivered and accredited by Online Business School, regulated under OFQUAL and the QCF framework.',
  partnershipBadges: [
    { text: 'UK Regulated' },
    { text: 'OFQUAL Recognised' },
    { text: 'QCF Framework' },
  ],
  ctaTitle: 'Ready to Start Your UK Education Journey?',
  ctaBody:
    'Contact EnidPath International today for personalised guidance and support with your application to Online Business School programmes.',
  ctaPrimaryLabel: 'Contact Us Now',
  ctaPrimaryHref: '/contact',
  ctaSecondaryLabel: 'View Our Services',
  ctaSecondaryHref: '/services',
}

const siteSettings = {
  siteTitle: 'EnidPath International',
  siteShortName: 'EnidPath',
  siteSuffix: 'International',
  headerPartnerLabel: 'Online Business School (UK)',
  headerCtaLabel: 'Start Your Journey',
  contactEmail: 'info@enidpath.com',
  contactPhone: '+256 700 000 000',
  whatsappNumber: '256700000000',
  address: 'Kampala, Uganda',
  officeHours: [
    { text: 'Mon - Fri: 9:00 AM - 6:00 PM' },
    { text: 'Sat: 9:00 AM - 1:00 PM' },
  ],
  footerDescription:
    'Your trusted partner for accessing quality UK higher education. Authorised recruitment partner of Online Business School (UK).',
  footerPartnerLabel: 'Online Business School (UK)',
  footerDisclaimer:
    'EnidPath International is an authorised recruitment partner and does not award degrees. All programmes are delivered by Online Business School (UK).',
  headerNavigation: [
    { label: 'Home', href: '/' },
    { label: 'About EnidPath', href: '/about' },
    { label: 'Courses', href: '/courses' },
    { label: 'Study with OBS', href: '/study' },
    { label: 'Our Services', href: '/services' },
    { label: 'Why Choose Us', href: '/why-choose' },
    { label: 'Contact', href: '/contact' },
  ],
  footerQuickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About EnidPath', href: '/about' },
    { label: 'Study with OBS', href: '/study' },
    { label: 'Our Services', href: '/services' },
  ],
  footerResourceLinks: [
    { label: 'Why Choose Us', href: '/why-choose' },
    { label: 'Contact Us', href: '/contact' },
  ],
  footerExternalLabel: 'Online Business School',
  footerExternalHref: 'https://www.onlinebusinessschool.com',
}

const programmeEntries = [
  {
    level: 'BA Pathway',
    title: 'Business Management Pathway',
    description:
      'Build a strong foundation in business principles and management practices with this comprehensive undergraduate pathway programme.',
    features: [
      { feature: 'Foundation to degree-level progression' },
      { feature: 'Business fundamentals and strategy' },
      { feature: 'Leadership and management skills' },
      { feature: 'Flexible online learning' },
    ],
  },
  {
    level: 'MBA Pathway',
    title: 'Master of Business Administration Pathway',
    description:
      'Advance your career with a prestigious MBA pathway programme designed for working professionals seeking leadership roles.',
    features: [
      { feature: 'Advanced business strategy' },
      { feature: 'Global leadership skills' },
      { feature: 'Strategic management focus' },
      { feature: 'Industry-relevant curriculum' },
    ],
  },
]

const pageEntries = [
  {
    slug: 'about',
    title: 'About Page',
    heroTitle: 'About EnidPath International',
    heroSubtitle:
      'Your trusted partner for accessing quality UK higher education. We guide and support international students on their journey to academic success.',
    overviewTitle: 'Who We Are',
    overviewParagraphs: [
      {
        text: 'EnidPath International is an authorised recruitment and student support partner of Online Business School (UK). We specialise in connecting ambitious international students with accredited UK higher education opportunities.',
      },
      {
        text: 'Based in Uganda, we provide comprehensive guidance and support services to students seeking affordable, flexible, and quality education pathways. Our role is to simplify the journey from enquiry to graduation.',
      },
      {
        text: 'We do not award degrees. All academic programmes are delivered and accredited by Online Business School (UK). Our expertise lies in student recruitment, application support, and ongoing assistance throughout your studies.',
      },
    ],
    missionTitle: 'Our Mission',
    missionBody:
      'To empower international students by providing accessible pathways to quality UK higher education, offering comprehensive guidance and support at every stage of their educational journey.',
    visionTitle: 'Our Vision',
    visionBody:
      'To become the leading student support partner in East Africa, known for transforming lives through quality education access and exceptional student services.',
    valuesSectionTitle: 'Our Core Values',
    valuesSectionSubtitle: 'These principles guide everything we do at EnidPath International.',
    coreValues: [
      {
        icon: 'shield',
        title: 'Integrity',
        description:
          'We maintain the highest ethical standards in all our interactions with students, partners, and stakeholders.',
      },
      {
        icon: 'eye',
        title: 'Transparency',
        description:
          'We provide clear, honest information about programmes, costs, and the educational pathway to help students make informed decisions.',
      },
      {
        icon: 'users',
        title: 'Student Focus',
        description:
          'Every decision we make is centred on student success and well-being, ensuring personalised support throughout your journey.',
      },
      {
        icon: 'target',
        title: 'Professionalism',
        description:
          'We uphold professional standards in service delivery, maintaining quality and consistency in everything we do.',
      },
      {
        icon: 'lightbulb',
        title: 'Innovation',
        description:
          'We continuously improve our services and embrace new approaches to make quality education more accessible.',
      },
      {
        icon: 'globe',
        title: 'Social Responsibility',
        description:
          'We are committed to expanding access to quality education and contributing to community development.',
      },
    ],
    partnershipTitle: 'A Partnership Built on Trust',
    partnershipBody:
      'As an authorised partner of Online Business School (UK), we bridge the gap between aspiring students and quality UK education. Our partnership ensures that students receive proper guidance while accessing accredited programmes delivered by OBS.',
    partnershipButtonLabel: 'Start Your Journey',
    partnershipButtonHref: '/contact',
  },
  {
    slug: 'services',
    title: 'Services Page',
    heroTitle: 'Our Services',
    heroSubtitle:
      'Comprehensive student support services designed to guide you from initial enquiry through graduation and beyond.',
    serviceNoteText:
      'provides recruitment and student support services in partnership with Online Business School (UK). All academic programmes are delivered by OBS.',
    servicesSectionTitle: 'How We Support You',
    servicesSectionSubtitle:
      'From your first enquiry to graduation, we are here to help every step of the way.',
    serviceCards: [
      {
        icon: 'message-circle',
        title: 'Enquiry Support',
        description:
          'Have questions about studying with Online Business School? We provide comprehensive answers about programmes, requirements, costs, and more.',
        features: [
          { text: 'Programme information and guidance' },
          { text: 'Eligibility assessment' },
          { text: 'Timeline and process overview' },
          { text: 'Responsive communication channels' },
        ],
      },
      {
        icon: 'graduation-cap',
        title: 'Course & Career Counselling',
        description:
          'Receive personalised advice to help you choose the right programme based on your career goals, background, and aspirations.',
        features: [
          { text: 'Career pathway analysis' },
          { text: 'Programme recommendations' },
          { text: 'Skills assessment' },
          { text: 'Goal-oriented guidance' },
        ],
      },
      {
        icon: 'credit-card',
        title: 'Financial Guidance',
        description:
          'We help you understand costs, payment options, and financial planning for your education journey.',
        features: [
          { text: 'Fee structure explanation' },
          { text: 'Payment plan options' },
          { text: 'Budget planning support' },
          { text: 'Financial advice' },
        ],
      },
      {
        icon: 'file-text',
        title: 'Application & Document Support',
        description:
          'Get assistance with your application to ensure everything is complete, accurate, and submitted correctly.',
        features: [
          { text: 'Application form assistance' },
          { text: 'Document checklist guidance' },
          { text: 'Submission support' },
          { text: 'Follow-up coordination' },
        ],
      },
      {
        icon: 'user-check',
        title: 'Admission Support',
        description:
          'We guide you through the admission process and help address any requirements or queries that arise.',
        features: [
          { text: 'Admission process guidance' },
          { text: 'Requirements clarification' },
          { text: 'Communication liaison' },
          { text: 'Status tracking' },
        ],
      },
      {
        icon: 'headphones',
        title: 'Post-Admission Support',
        description:
          'Our support continues after admission. We help you navigate your studies and address any challenges you may face.',
        features: [
          { text: 'Onboarding assistance' },
          { text: 'Ongoing student support' },
          { text: 'Issue resolution' },
          { text: 'Progress guidance' },
        ],
      },
    ],
    processSectionTitle: 'Your Journey With Us',
    processSectionSubtitle: 'A simple, supported path from enquiry to enrolment.',
    processSteps: [
      { step: '01', title: 'Enquire', description: 'Reach out to us with your questions and interests.' },
      { step: '02', title: 'Consult', description: 'Receive personalised guidance on the right programme.' },
      { step: '03', title: 'Apply', description: 'Get support with your application to OBS.' },
      { step: '04', title: 'Succeed', description: 'Begin your studies with ongoing support.' },
    ],
    ctaTitle: 'Ready to Get Started?',
    ctaBody:
      'Contact us today to learn more about our services and how we can support your educational journey.',
    ctaPrimaryLabel: 'Contact Us Today',
    ctaPrimaryHref: '/contact',
  },
  {
    slug: 'why-choose',
    title: 'Why Choose Us Page',
    heroTitle: 'Why Choose EnidPath International?',
    heroSubtitle:
      'Discover why students trust us as their recruitment and support partner for accessing UK-accredited programmes delivered by Online Business School.',
    reasonsSectionTitle: 'Why Choose EnidPath International?',
    reasonsSectionSubtitle: '',
    reasons: [
      {
        icon: 'shield',
        title: 'Authorised Partner',
        description:
          'We are an officially authorised recruitment and student support partner of Online Business School (UK), ensuring you receive legitimate guidance and support.',
      },
      {
        icon: 'award',
        title: 'UK Accredited Programmes',
        description:
          'Access programmes delivered by Online Business School (UK), regulated under OFQUAL and the QCF framework.',
      },
      {
        icon: 'credit-card',
        title: 'Affordable Education',
        description:
          'Complete your BA or MBA pathway for less than £6,000. Quality UK education at a fraction of traditional costs.',
      },
      {
        icon: 'globe',
        title: 'Local Presence, Global Access',
        description:
          'Based in Uganda, we understand local needs while connecting you to world-class UK education opportunities.',
      },
      {
        icon: 'headphones',
        title: 'End-to-End Support',
        description:
          'From initial enquiry to graduation, our team provides comprehensive guidance and assistance throughout your journey.',
      },
      {
        icon: 'clock',
        title: 'Flexible Learning',
        description:
          'Study at your own pace, on your own schedule, without disrupting your career or personal life.',
      },
    ],
    expectationsTitle: 'What You Can Expect',
    expectationsBody:
      "When you partner with EnidPath International, you're choosing a team dedicated to your educational success. Here's what our students experience:",
    expectationPoints: [
      { text: 'Personalised guidance tailored to your goals' },
      { text: 'Clear and transparent communication' },
      { text: 'Responsive support when you need it' },
      { text: 'Genuine care for your success' },
      { text: 'Professional and ethical service' },
      { text: 'Long-term relationship focus' },
    ],
    testimonialQuote:
      "\"EnidPath International made my dream of studying for a UK qualification a reality. Their team guided me through every step, from choosing the right programme to completing my application. I couldn't have done it without their support.\"",
    testimonialAuthor: 'EnidPath Student',
    testimonialRole: 'MBA Pathway Programme',
    commitmentTitle: 'Our Commitment to You',
    commitmentBody:
      'As an authorised partner of Online Business School (UK), we are committed to maintaining the highest standards of integrity and service. We provide honest guidance, transparent information, and genuine support, never making promises we cannot keep.',
    commitmentBadges: [
      { text: 'Authorised Partner' },
      { text: 'Ethical Service' },
      { text: 'Student-Focused' },
    ],
    ctaTitle: 'Start Your Journey Today',
    ctaBody:
      'Join the students who have trusted EnidPath International to guide them toward their educational goals.',
    ctaPrimaryLabel: 'Contact Us Now',
    ctaPrimaryHref: '/contact',
  },
  {
    slug: 'contact',
    title: 'Contact Page',
    heroTitle: 'Contact Us',
    heroSubtitle:
      'Ready to start your educational journey? Get in touch with our team for personalised guidance and support.',
    formTitle: 'Send Us a Message',
    formSubtitle: 'Fill out the form below and our team will get back to you within 24 hours.',
    contactInfoTitle: 'Get in Touch',
    contactInfoSubtitle:
      "Reach out to us through any of the following channels. We're here to help!",
    whatsappTitle: 'Quick Response via WhatsApp',
    whatsappBody:
      'For faster responses, reach out to us on WhatsApp. We typically respond within minutes during office hours.',
    trustBannerText:
      'is an authorised recruitment and student support partner of Online Business School (UK). We provide guidance and support services. All academic programmes are delivered by OBS.',
  },
  {
    slug: 'courses',
    title: 'Courses Page',
    heroTitle: 'Available Courses',
    heroSubtitle:
      'Explore the full range of UK-accredited programmes delivered by Online Business School (UK). EnidPath International provides guidance and support throughout your learning journey.',
    filterLabel: 'Filter by Level:',
    levelDescriptions: [
      { level: 'IGCSE', description: 'International General Certificate of Secondary Education' },
      { level: 'IELTS', description: 'International English Language Testing System' },
      { level: 'Level 3', description: 'Foundation Level - Entry to Higher Education' },
      { level: 'Level 4', description: 'Certificate Level - First Year Undergraduate Equivalent' },
      { level: 'Level 5', description: 'Diploma Level - Second Year Undergraduate Equivalent' },
      { level: 'Level 4 & 5', description: 'Extended Diploma - Two Year Programme' },
      { level: 'Level 6', description: "Bachelor's Degree Top-Up Level" },
      { level: 'Level 7', description: "Master's Degree Level" },
    ],
    disclaimerText:
      'All courses listed are delivered and accredited by Online Business School (UK). EnidPath International is an authorised recruitment and student support partner. Contact us for guidance on course selection and enrolment support.',
    ctaTitle: 'Need Help Choosing a Course?',
    ctaBody:
      'Our counsellors are here to help you find the right programme for your career goals. Get personalised guidance from EnidPath International.',
    ctaPrimaryLabel: 'Contact Our Team',
    ctaPrimaryHref: '/contact',
  },
  {
    slug: 'study',
    title: 'Study Page',
    heroBadge: 'Delivered by Online Business School (UK)',
    heroTitle: 'Study with Online Business School',
    heroSubtitle:
      'Access accredited UK BA and MBA pathway programmes through our partnership with Online Business School. Quality education made affordable and accessible.',
    noticeTitle: 'All programmes are delivered and accredited by Online Business School (UK).',
    noticeBody:
      'EnidPath International provides recruitment, guidance, and student support services. We do not deliver or accredit programmes.',
    aboutTitle: 'About Online Business School (UK)',
    aboutParagraphs: [
      {
        text: 'Online Business School (UK) is a leading provider of online higher education programmes, offering flexible pathways to undergraduate and postgraduate qualifications. Their programmes are designed for ambitious individuals seeking quality UK education without the traditional constraints of location and schedule.',
      },
      {
        text: 'Programmes offered by OBS are regulated under the Office of Qualifications and Examinations Regulation (OFQUAL) and follow the Qualifications and Credit Framework (QCF), ensuring recognition and quality assurance that meets UK standards.',
      },
      {
        text: 'Through our partnership with OBS, EnidPath International helps international students access these programmes with comprehensive support throughout their educational journey.',
      },
    ],
    programmesSectionTitle: 'Available Programmes',
    programmesSectionSubtitle:
      'Choose from BA and MBA pathway programmes designed to advance your career.',
    benefitsSectionTitle: 'Why Choose OBS Programmes?',
    benefitsSectionSubtitle:
      'Quality, flexibility, and recognition combined in one educational pathway.',
    studyBenefits: [
      {
        icon: 'award',
        title: 'UK Accredited',
        description:
          'Programmes regulated under OFQUAL and the Qualifications and Credit Framework (QCF).',
      },
      {
        icon: 'globe',
        title: 'Study Anywhere',
        description:
          '100% online delivery allows you to study from anywhere in the world.',
      },
      {
        icon: 'clock',
        title: 'Flexible Schedule',
        description:
          'Balance your studies with work and personal commitments.',
      },
      {
        icon: 'trending-up',
        title: 'Career Progression',
        description:
          'Gain qualifications that open doors to career advancement.',
      },
    ],
    affordabilityTitle: 'Affordable UK Education',
    affordabilityBody:
      'Complete your BA or MBA pathway programme for less than £6,000. Quality UK education that fits your budget.',
    ctaPrimaryLabel: 'Get Pricing Details',
    ctaPrimaryHref: '/contact',
    ctaSecondaryLabel: 'View Our Support Services',
    ctaSecondaryHref: '/services',
  },
]

async function loadPayload() {
  const configPath = path.resolve(rootDir, 'payload.config.ts')
  const configModule = await import(pathToFileURL(configPath).href)
  const config = await (configModule.default || configModule)

  return getPayload({ config })
}

async function upsertPage(payload, page) {
  const existing = await payload.find({
    collection: 'Pages',
    where: {
      slug: {
        equals: page.slug,
      },
    },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: 'Pages',
      id: existing.docs[0].id,
      data: page,
      overrideAccess: true,
    })
    console.log(`Updated page: ${page.slug}`)
    return
  }

  await payload.create({
    collection: 'Pages',
    data: page,
    overrideAccess: true,
  })
  console.log(`Created page: ${page.slug}`)
}

async function upsertProgramme(payload, programme) {
  const existing = await payload.find({
    collection: 'Programmes',
    where: {
      title: {
        equals: programme.title,
      },
    },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: 'Programmes',
      id: existing.docs[0].id,
      data: programme,
      overrideAccess: true,
    })
    console.log(`Updated programme: ${programme.title}`)
    return
  }

  await payload.create({
    collection: 'Programmes',
    data: programme,
    overrideAccess: true,
  })
  console.log(`Created programme: ${programme.title}`)
}

async function updateGlobal(payload, slug, data) {
  await payload.updateGlobal({
    slug,
    data,
    overrideAccess: true,
  })
  console.log(`Updated global: ${slug}`)
}

async function seed() {
  try {
    console.log('Initializing Payload...')
    const payload = await loadPayload()

    await updateGlobal(payload, 'HomeSettings', homeSettings)
    await updateGlobal(payload, 'SiteSettings', siteSettings)

    for (const page of pageEntries) {
      await upsertPage(payload, page)
    }

    for (const programme of programmeEntries) {
      await upsertProgramme(payload, programme)
    }

    console.log('Website CMS content is ready.')
  } catch (error) {
    console.error('CMS content seed failed:', error)
    process.exitCode = 1
  }
}

await seed()
