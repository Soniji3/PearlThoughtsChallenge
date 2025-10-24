<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Hospital Appointment Scheduler - README</title>
<style>
  body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; background: #f9f9f9; }
  h1, h2, h3 { color: #1f2937; }
  code { background: #e5e7eb; padding: 2px 4px; border-radius: 4px; }
  pre { background: #e5e7eb; padding: 10px; border-radius: 6px; overflow-x: auto; }
  a { color: #2563eb; text-decoration: none; }
  a:hover { text-decoration: underline; }
  ul { margin-bottom: 15px; }
  li { margin-bottom: 5px; }
</style>
</head>
<body>

<h1>Hospital Appointment Scheduler</h1>

<h2>🚀 Overview</h2>
<p>A <strong>frontend hospital appointment scheduling interface</strong> that allows users to:</p>
<ul>
  <li>View doctor appointments in <strong>day and week calendar views</strong>.</li>
  <li>Filter appointments by doctor.</li>
  <li>See <strong>doctor details and photo</strong>.</li>
  <li>Handles overlapping appointments, responsive design, and color-coded appointment types.</li>
</ul>
<p>Built using <strong>Next.js 14</strong>, <strong>TypeScript</strong>, and modern frontend architecture patterns.</p>

<h2>📋 Features</h2>

<h3>Core Features</h3>
<ul>
  <li><strong>Day View Calendar</strong>
    <ul>
      <li>Shows appointments from 8 AM – 6 PM in 30-min intervals.</li>
      <li>Displays patient name, appointment type, and duration.</li>
      <li>Color-coded by appointment type.</li>
      <li>Handles overlapping appointments.</li>
    </ul>
  </li>
  <li><strong>Week View Calendar</strong>
    <ul>
      <li>Shows 7-day grid view for selected doctor.</li>
      <li>Responsive and maintains correct time positioning.</li>
    </ul>
  </li>
  <li><strong>Doctor Selector</strong>
    <ul>
      <li>Dropdown to select a doctor or “All Doctors”.</li>
      <li>Displays doctor photo, name, specialty, and working hours.</li>
    </ul>
  </li>
  <li><strong>Role-Based Filtering</strong>
    <ul>
      <li>Front desk staff: view all doctors.</li>
      <li>Doctor view: only their own schedule (simulated in frontend).</li>
    </ul>
  </li>
</ul>

<h3>Bonus Features</h3>
<ul>
  <li>Default image for "All Doctors" selection.</li>
  <li>Dynamic doctor photo updates when selection changes.</li>
</ul>

<h2>🏗️ Architecture & Design</h2>
<ul>
  <li><strong>Separation of Concerns</strong>
    <ul>
      <li><code>services/appointmentService.ts</code> – Data access logic.</li>
      <li><code>hooks/useAppointments.ts</code> – Headless business logic hook.</li>
      <li><code>components/</code> – Composable UI components (<code>ScheduleView</code>, <code>DayView</code>, <code>WeekView</code>, <code>DoctorSelector</code>).</li>
    </ul>
  </li>
  <li><strong>Domain Models</strong>
    <ul>
      <li>Optional <code>TimeSlot</code> and <code>Appointment</code> classes for logic encapsulation.</li>
    </ul>
  </li>
  <li><strong>Headless Components</strong>
    <ul>
      <li>Logic separated from presentation; easy to test and reuse.</li>
    </ul>
  </li>
  <li><strong>Responsive Design</strong> – Works on desktop and mobile.</li>
</ul>

<h2>📁 Project Structure</h2>
<pre>
app/
├── page.tsx                    
├── schedule/
│   └── page.tsx               
├── components/
│   ├── ScheduleView.tsx       
│   ├── DayView.tsx            
│   ├── WeekView.tsx           
│   ├── DoctorSelector.tsx     
│   └── ui/                    
├── hooks/
│   └── useAppointments.ts     
├── services/
│   └── appointmentService.ts  
├── domain/                     
│   ├── Appointment.ts
│   └── TimeSlot.ts
├── types/
│   └── index.ts               
└── data/
    └── mockData.ts            
</pre>

<h2>💻 Getting Started</h2>
<ol>
  <li>Clone the repository:
<pre>git clone https://github.com/yourusername/hospital-scheduler.git
cd hospital-scheduler</pre>
  </li>
  <li>Install dependencies:
<pre>npm install</pre></li>
  <li>Run the development server:
<pre>npm run dev</pre></li>
  <li>Open <a href="http://localhost:3000">http://localhost:3000</a> in your browser.</li>
</ol>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li>Framework: Next.js 14</li>
  <li>Language: TypeScript</li>
  <li>UI: HTML/CSS, custom components</li>
  <li>Libraries: date-fns, optional React libraries for calendar</li>
  <li>Tools: Git, GitHub</li>
</ul>

<h2>🎨 Visual Design</h2>
<ul>
  <li>Color-coded appointment types:
    <ul>
      <li>Checkup: Blue (#3b82f6)</li>
      <li>Consultation: Green (#10b981)</li>
      <li>Follow-up: Orange (#f59e0b)</li>
      <li>Procedure: Purple (#8b5cf6)</li>
    </ul>
  </li>
  <li>Default image shown for “All Doctors”.</li>
  <li>Doctor photo updates dynamically when selected.</li>
</ul>

<h2>📌 How to Use</h2>
<ol>
  <li>Select a doctor from the dropdown.</li>
  <li>Choose a date using the date picker.</li>
  <li>View the appointments in <strong>Day</strong> or <strong>Week</strong> view.</li>
  <li>Doctor image updates dynamically based on selection.</li>
</ol>

<h2>⚖️ Trade-offs</h2>
<ul>
  <li>No backend; uses mock data.</li>
  <li>No drag-and-drop or appointment creation.</li>
  <li>Can improve by adding dynamic week view with multiple doctors and current time indicator.</li>
</ul>

<h2>🤖 AI Usage</h2>
<ul>
  <li>Used ChatGPT to generate initial HTML, CSS, and JS structure.</li>
  <li>Customized AI-generated code for doctor image feature, calendar rendering, and responsive design.</li>
</ul>

<h2>✅ Submission Notes</h2>
<ul>
  <li>Fully functional frontend only.</li>
  <li>Works with <code>npm run dev</code>.</li>
  <li>Clean TypeScript code with no <code>any</code> types.</li>
  <li>Components are composable and reusable.</li>
</ul>

</body>
</html>
