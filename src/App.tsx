import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import './App.css';
type Role =
  | 'Super Admin'
  | 'School Admin'
  | 'Class Teacher'
  | 'Subject Teacher'
  | 'Account'
  | 'Student';

type Student = {
  id: string;
  name: string;
  className: string;
  section: string;
  stream?: string;
  parentMobile: string;
  status: 'Active' | 'Inactive';
};

type SchoolProfile = {
  logo: string;
  schoolName: string;
  schoolCode: string;
  address: string;
  district: string;
  state: string;
  pinCode: string;
  contactNumber: string;
  email: string;
  principalName: string;
  academicSession: string;
  schoolType: string;
  medium: string;
  classesAvailable: string[];
};

type TeacherAssignment = {
  id: string;
  teacherId: string;
  type: 'Class Teacher' | 'Subject Teacher';
  className: string;
  section: string;
  stream?: string;
  subject: string;
  academicSession: string;
};

type Teacher = {
  id: string;
  name: string;
  employeeId: string;
  mobile: string;
  email: string;
  loginId: string;
  password: string;
  status: 'Active' | 'Inactive';
};

const demoTeachers: Teacher[] = [
  {
    id: 'TCH001',
    name: 'Ritu Soni',
    employeeId: 'EMP001',
    mobile: '9876543210',
    email: 'ritu@example.com',
    loginId: 'Ritu Soni',
    password: '9876543210',
    status: 'Active',
  },
  {
    id: 'TCH002',
    name: 'Rahul Kumar',
    employeeId: 'EMP002',
    mobile: '9876543211',
    email: 'rahul@example.com',
    loginId: 'Rahul Kumar',
    password: '9876543211',
    status: 'Active',
  },
  {
    id: 'TCH003',
    name: 'Riya Gupta',
    employeeId: 'EMP003',
    mobile: '9876543212',
    email: 'riya@example.com',
    loginId: 'Riya Gupta',
    password: '9876543212',
    status: 'Active',
  },
  {
    id: 'TCH004',
    name: 'Akhilesh Singh',
    employeeId: 'EMP004',
    mobile: '9876543213',
    email: 'akhilesh@example.com',
    loginId: 'Akhilesh Singh',
    password: '9876543213',
    status: 'Active',
  },
  {
    id: 'TCH005',
    name: 'Pratyush Mishra',
    employeeId: 'EMP005',
    mobile: '9876543214',
    email: 'pratyush@example.com',
    loginId: 'Pratyush Mishra',
    password: '9876543214',
    status: 'Active',
  },
];

const demoTeacherAssignments: TeacherAssignment[] = [
  {
    id: 'ASG001',
    teacherId: 'TCH001',
    type: 'Class Teacher',
    className: '3',
    section: 'A',
    subject: '',
    academicSession: '2026–2027',
  },
  {
    id: 'ASG002',
    teacherId: 'TCH001',
    type: 'Subject Teacher',
    className: '3',
    section: 'A',
    subject: 'English',
    academicSession: '2026–2027',
  },
  {
    id: 'ASG003',
    teacherId: 'TCH002',
    type: 'Subject Teacher',
    className: '3',
    section: 'A',
    subject: 'Science',
    academicSession: '2026–2027',
  },
  {
    id: 'ASG004',
    teacherId: 'TCH003',
    type: 'Subject Teacher',
    className: '3',
    section: 'A',
    subject: 'English',
    academicSession: '2026–2027',
  },
  {
    id: 'ASG005',
    teacherId: 'TCH003',
    type: 'Subject Teacher',
    className: '5',
    section: 'A',
    subject: 'Mathematics',
    academicSession: '2026–2027',
  },
  {
    id: 'ASG006',
    teacherId: 'TCH004',
    type: 'Subject Teacher',
    className: '3',
    section: 'A',
    subject: 'Hindi',
    academicSession: '2026–2027',
  },
  {
    id: 'ASG007',
    teacherId: 'TCH005',
    type: 'Subject Teacher',
    className: '3',
    section: 'A',
    subject: 'Mathematics',
    academicSession: '2026–2027',
  },
  {
    id: 'ASG008',
    teacherId: 'TCH002',
    type: 'Subject Teacher',
    className: '11',
    section: 'A',
    stream: 'Science',
    subject: 'Physics',
    academicSession: '2026–2027',
  },
];

const defaultSchoolProfile: SchoolProfile = {
  logo: '',
  schoolName: 'Demo Public School',
  schoolCode: 'SPS001',
  address: 'Main Road, Demo City',
  district: 'Gorakhpur',
  state: 'Uttar Pradesh',
  pinCode: '273001',
  contactNumber: '9876543210',
  email: 'school@example.com',
  principalName: 'Demo Principal',
  academicSession: '2026–2027',
  schoolType: 'Private',
  medium: 'Hindi',
  classesAvailable: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ],
};

const demoStudents: Student[] = [
  {
    id: 'SPS001-2026-0001',
    name: 'Aarav Kumar',
    className: '6',
    section: 'A',
    parentMobile: '******1234',
    status: 'Active',
  },
  {
    id: 'SPS001-2026-0002',
    name: 'Ananya Singh',
    className: '7',
    section: 'B',
    parentMobile: '******2345',
    status: 'Active',
  },
  {
    id: 'SPS001-2026-0003',
    name: 'Rahul Yadav',
    className: '8',
    section: 'A',
    parentMobile: '******3456',
    status: 'Active',
  },
  {
    id: 'SPS001-2026-0004',
    name: 'Priya Gupta',
    className: '9',
    section: 'A',
    parentMobile: '******4567',
    status: 'Active',
  },
  {
    id: 'SPS001-2026-0005',
    name: 'Vivek Mishra',
    className: '10',
    section: 'B',
    parentMobile: '******5678',
    status: 'Inactive',
  },
  {
    id: 'SPS001-2026-0006',
    name: 'Rohan Singh',
    className: '3',
    section: 'A',
    parentMobile: '******6780',
    status: 'Active',
  },
  {
    id: 'SPS001-2026-0007',
    name: 'Priya Singh',
    className: '3',
    section: 'A',
    parentMobile: '******6781',
    status: 'Active',
  },
  {
    id: 'SPS001-2026-0008',
    name: 'Aman Kumar',
    className: '3',
    section: 'A',
    parentMobile: '******6782',
    status: 'Active',
  },
  {
    id: 'SPS001-2026-0011',
    name: 'Aditya Singh',
    className: '11',
    section: 'A',
    stream: 'Science',
    parentMobile: '******6789',
    status: 'Active',
  },
  {
    id: 'SPS001-2026-0012',
    name: 'Neha Gupta',
    className: '11',
    section: 'A',
    stream: 'Commerce',
    parentMobile: '******7890',
    status: 'Active',
  },
];

const demoClasses = [
  { className: '1', sections: ['A', 'B'], streamRequired: false },
  { className: '2', sections: ['A', 'B'], streamRequired: false },
  { className: '3', sections: ['A', 'B'], streamRequired: false },
  { className: '4', sections: ['A', 'B'], streamRequired: false },
  { className: '5', sections: ['A', 'B'], streamRequired: false },
  { className: '6', sections: ['A', 'B'], streamRequired: false },
  { className: '7', sections: ['A', 'B'], streamRequired: false },
  { className: '8', sections: ['A', 'B'], streamRequired: false },
  { className: '9', sections: ['A', 'B'], streamRequired: false },
  { className: '10', sections: ['A', 'B'], streamRequired: false },
  { className: '11', sections: ['A'], streamRequired: true },
  { className: '12', sections: ['A'], streamRequired: true },
];

const demoSubjects = [
  { className: '3', subject: 'Hindi', code: 'HIN-03' },
  { className: '3', subject: 'English', code: 'ENG-03' },
  { className: '3', subject: 'Mathematics', code: 'MAT-03' },
  { className: '3', subject: 'Science', code: 'SCI-03' },
  { className: '3', subject: 'Social Science', code: 'SST-03' },
  { className: '6', subject: 'Hindi', code: 'HIN-06' },
  { className: '6', subject: 'English', code: 'ENG-06' },
  { className: '6', subject: 'Mathematics', code: 'MAT-06' },
  { className: '11', subject: 'Physics', code: 'PHY-11' },
  { className: '11', subject: 'Chemistry', code: 'CHE-11' },
  { className: '11', subject: 'Mathematics', code: 'MAT-11' },
  { className: '11', subject: 'Accountancy', code: 'ACC-11' },
];

const demoExams = [
  {
    id: 'EX001',
    name: 'Unit Test 1',
    date: '2026-07-15',
    maxMarks: 100,
    status: 'Completed',
  },
  {
    id: 'EX002',
    name: 'Half Yearly',
    date: '2026-09-20',
    maxMarks: 100,
    status: 'Upcoming',
  },
  {
    id: 'EX003',
    name: 'Unit Test 2',
    date: '2026-11-15',
    maxMarks: 100,
    status: 'Upcoming',
  },
  {
    id: 'EX004',
    name: 'Annual Exam',
    date: '2027-03-10',
    maxMarks: 100,
    status: 'Upcoming',
  },
];

const menuItems = [
  { label: 'Dashboard', icon: '🏠' },
  { label: 'School Profile', icon: '🏫' },
  { label: 'Students', icon: '👨‍🎓' },
  { label: 'Teachers', icon: '👩‍🏫' },
  { label: 'Classes & Subjects', icon: '📘' },
  { label: 'Exams', icon: '📝' },
  { label: 'Attendance', icon: '🗓️' },
  { label: 'Results', icon: '📄' },
  { label: 'Fees', icon: '💰' },
  { label: 'TC & Documents', icon: '📃' },
  { label: 'Notices', icon: '📢' },
  { label: 'Academic History', icon: '📚' },
];

function AuthScreen({
  onLogin,
}: {
  onLogin: (userName: string, userRole: Role) => void;
}) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('School Admin');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const cleanLoginId = loginId.trim();
    const cleanPassword = password.trim();

    if (!cleanLoginId || !cleanPassword) {
      setError('Please enter your Login ID and password.');
      return;
    }

    // Frontend demo credentials only.
    // Production authentication will be connected to the backend/database later.
    const demoUsers: Array<{
      loginId: string;
      password: string;
      role: Role;
      name: string;
    }> = [
      {
        loginId: 'superadmin',
        password: 'admin123',
        role: 'Super Admin',
        name: 'Super Administrator',
      },
      {
        loginId: 'School Admin',
        password: '9876543210',
        role: 'School Admin',
        name: 'School Admin',
      },
      {
        loginId: 'Ritu Soni',
        password: '9876543210',
        role: 'Class Teacher',
        name: 'Ritu Soni',
      },
      {
        loginId: 'Rahul Kumar',
        password: '9876543210',
        role: 'Subject Teacher',
        name: 'Rahul Kumar',
      },
      {
        loginId: 'Pooja Sharma',
        password: '9123456780',
        role: 'Account',
        name: 'Pooja Sharma',
      },
      {
        loginId: 'Demo Student',
        password: '9876543210',
        role: 'Student',
        name: 'Demo Student',
      },
    ];

    const matchedUser = demoUsers.find(
      (user) =>
        user.loginId.toLowerCase() === cleanLoginId.toLowerCase() &&
        user.password === cleanPassword &&
        user.role === selectedRole
    );

    if (!matchedUser) {
      setError('Invalid Login ID or password.');
      return;
    }

    onLogin(matchedUser.name, matchedUser.role);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand-symbol">S</div>

          <div>
            <h1>SHIKSHA</h1>
            <span>ONE</span>
          </div>
        </div>

        <div className="auth-heading">
          <h2>Welcome Back!</h2>
          <p>Login to your SHIKSHA ONE account.</p>
        </div>

        <div className="auth-tabs">
          <button type="button" className="auth-tab active">
            Login
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="auth-login-id">Login ID</label>

            <input
              id="auth-login-id"
              type="text"
              autoComplete="username"
              placeholder="Enter your name / Login ID"
              value={loginId}
              onChange={(event) => setLoginId(event.target.value)}
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="auth-role">Select Role</label>

            <select
              id="auth-role"
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value as Role)}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #d7e3df',
                borderRadius: '10px',
                background: '#ffffff',
                color: '#173f36',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            >
              <option value="Super Admin">Super Admin</option>
              <option value="School Admin">School Admin</option>
              <option value="Class Teacher">Class Teacher</option>
              <option value="Subject Teacher">Subject Teacher</option>
              <option value="Account">Account / Accountant</option>
              <option value="Student">Student</option>
            </select>
          </div>

          <div className="auth-form-group">
            <label htmlFor="auth-password">Password</label>

            <input
              id="auth-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit-button">
            Login to Dashboard
          </button>
        </form>

        <div className="auth-demo-box">
          <strong>Demo Login</strong>
          <p>
            Login ID is created by the administrator. Initial password is the
            registered mobile number.
          </p>
          <p>
            <strong>School Admin:</strong> School Admin / 9876543210
          </p>
          <p>
            <strong>Class Teacher:</strong> Ritu Soni / 9876543210
          </p>
          <p>
            <strong>Subject Teacher:</strong> Rahul Kumar / 9876543210
          </p>
          <p>
            <strong>Account:</strong> Pooja Sharma / 9123456780
          </p>
          <p>
            <strong>Student:</strong> Demo Student / 9876543210
          </p>
          <p>
            <strong>Super Admin:</strong> superadmin / admin123
          </p>
        </div>

        <p className="auth-footer">© 2026 SHIKSHA ONE. All rights reserved.</p>
      </div>
    </div>
  );
}

function DashboardHome({ profile }: { profile: SchoolProfile }) {
  const activeClassCount = profile.classesAvailable.length;

  return (
    <div className="dashboard-home">
      <div className="page-heading">
        <div>
          <p className="eyebrow">SCHOOL OVERVIEW</p>
          <h1>Dashboard</h1>
          <p>Manage your school from one place.</p>
        </div>
      </div>

      <div className="notice-banner">
        <div>
          <strong>Welcome to SHIKSHA ONE!</strong>
          <p>Your school management system is ready to use.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Students</span>
          <strong>5</strong>
          <small>Registered students</small>
        </div>

        <div className="stat-card">
          <span>Total Teachers</span>
          <strong>12</strong>
          <small>School teaching staff</small>
        </div>

        <div className="stat-card">
          <span>Attendance</span>
          <strong>92%</strong>
          <small>Today's attendance</small>
        </div>

        <div className="stat-card">
          <span>Classes</span>
          <strong>{activeClassCount}</strong>
          <small>Classes configured</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-heading">
            <h2>Quick Actions</h2>
          </div>

          <div className="quick-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={() => alert('Open Students module.')}
            >
              + Add Student
            </button>

            <button
              className="secondary-button"
              type="button"
              onClick={() => alert('Teacher module coming soon.')}
            >
              + Add Teacher
            </button>

            <button
              className="secondary-button"
              type="button"
              onClick={() => alert('Notice module coming soon.')}
            >
              + Create Notice
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <h2>School Profile</h2>
          </div>

          <div className="school-profile">
            <p>
              <strong>School Name:</strong> {profile.schoolName}
            </p>

            <p>
              <strong>School Code:</strong> {profile.schoolCode}
            </p>

            <p>
              <strong>Academic Session:</strong> {profile.academicSession}
            </p>

            <p>
              <strong>Principal / Head:</strong> {profile.principalName || '—'}
            </p>

            <p>
              <strong>Location:</strong> {profile.district}, {profile.state}
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-card edumitra-box">
        <div>
          <p className="eyebrow">LEARNING PARTNER</p>
          <h2>Edu Mitra</h2>
          <p>Help teachers and students learn with RITU AI Teacher.</p>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={() => alert('Edu Mitra integration coming soon.')}
        >
          Explore Edu Mitra
        </button>
      </div>
    </div>
  );
}

function SchoolProfilePage({
  profile,
  onSave,
}: {
  profile: SchoolProfile;
  onSave: (profile: SchoolProfile) => void;
}) {
  const [form, setForm] = useState<SchoolProfile>(profile);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const updateField = <K extends keyof SchoolProfile>(
    field: K,
    value: SchoolProfile[K]
  ) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setSavedMessage('');
  };

  const toggleClass = (classNumber: string) => {
    setForm((previous) => {
      const exists = previous.classesAvailable.includes(classNumber);
      const nextClasses = exists
        ? previous.classesAvailable.filter((item) => item !== classNumber)
        : [...previous.classesAvailable, classNumber];

      return {
        ...previous,
        classesAvailable: nextClasses.sort((a, b) => Number(a) - Number(b)),
      };
    });
    setSavedMessage('');
  };

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file for the school logo.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateField('logo', reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.schoolName.trim() || !form.schoolCode.trim()) {
      alert('School Name and School Code are required.');
      return;
    }

    if (form.pinCode && !/^\d{6}$/.test(form.pinCode)) {
      alert('PIN Code must contain 6 digits.');
      return;
    }

    if (form.contactNumber && !/^\d{10}$/.test(form.contactNumber)) {
      alert('Contact Number must contain 10 digits.');
      return;
    }

    onSave({
      ...form,
      schoolName: form.schoolName.trim(),
      schoolCode: form.schoolCode.trim().toUpperCase(),
      address: form.address.trim(),
      district: form.district.trim(),
      state: form.state.trim(),
      pinCode: form.pinCode.trim(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim(),
      principalName: form.principalName.trim(),
      academicSession: form.academicSession.trim(),
      schoolType: form.schoolType.trim(),
      medium: form.medium.trim(),
    });

    setSavedMessage('School Profile saved successfully.');
  };

  return (
    <div className="students-page">
      <div className="module-header">
        <div>
          <p className="eyebrow">SCHOOL MANAGEMENT</p>
          <h1>School Profile</h1>
          <p>
            Save the school's official information for use throughout SHIKSHA
            ONE.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <h2>Basic School Information</h2>
              <p>These details will be shown across the school system.</p>
            </div>
          </div>

          <div className="student-form">
            <div className="form-group">
              <label htmlFor="school-name">School Name *</label>
              <input
                id="school-name"
                type="text"
                value={form.schoolName}
                onChange={(event) =>
                  updateField('schoolName', event.target.value)
                }
                placeholder="Enter school name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="school-code">School Code *</label>
              <input
                id="school-code"
                type="text"
                value={form.schoolCode}
                onChange={(event) =>
                  updateField('schoolCode', event.target.value)
                }
                placeholder="Example: SPS001"
              />
            </div>

            <div className="form-group">
              <label htmlFor="principal-name">Principal / Head Name</label>
              <input
                id="principal-name"
                type="text"
                value={form.principalName}
                onChange={(event) =>
                  updateField('principalName', event.target.value)
                }
                placeholder="Enter principal / head name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="academic-session">Academic Session</label>
              <input
                id="academic-session"
                type="text"
                value={form.academicSession}
                onChange={(event) =>
                  updateField('academicSession', event.target.value)
                }
                placeholder="Example: 2026–2027"
              />
            </div>

            <div className="form-group">
              <label htmlFor="school-type">School Type</label>
              <select
                id="school-type"
                value={form.schoolType}
                onChange={(event) =>
                  updateField('schoolType', event.target.value)
                }
              >
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Government Aided">Government Aided</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="school-medium">Medium</label>
              <select
                id="school-medium"
                value={form.medium}
                onChange={(event) => updateField('medium', event.target.value)}
              >
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Hindi & English">Hindi & English</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="school-address">Address</label>
              <textarea
                id="school-address"
                rows={3}
                value={form.address}
                onChange={(event) => updateField('address', event.target.value)}
                placeholder="Enter complete school address"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #d7e3df',
                  borderRadius: '10px',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="school-district">District</label>
              <input
                id="school-district"
                type="text"
                value={form.district}
                onChange={(event) =>
                  updateField('district', event.target.value)
                }
                placeholder="Enter district"
              />
            </div>

            <div className="form-group">
              <label htmlFor="school-state">State</label>
              <input
                id="school-state"
                type="text"
                value={form.state}
                onChange={(event) => updateField('state', event.target.value)}
                placeholder="Enter state"
              />
            </div>

            <div className="form-group">
              <label htmlFor="school-pin">PIN Code</label>
              <input
                id="school-pin"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={form.pinCode}
                onChange={(event) =>
                  updateField('pinCode', event.target.value.replace(/\D/g, ''))
                }
                placeholder="6 digit PIN"
              />
            </div>

            <div className="form-group">
              <label htmlFor="school-contact">Contact Number</label>
              <input
                id="school-contact"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={form.contactNumber}
                onChange={(event) =>
                  updateField(
                    'contactNumber',
                    event.target.value.replace(/\D/g, '')
                  )
                }
                placeholder="10 digit contact number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="school-email">Email</label>
              <input
                id="school-email"
                type="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="school@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="school-logo">School Logo</label>
              <input
                id="school-logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </div>
          </div>

          {form.logo && (
            <div style={{ marginTop: 20 }}>
              <p style={{ marginBottom: 8, fontWeight: 700 }}>Logo Preview</p>
              <img
                src={form.logo}
                alt="School logo preview"
                style={{
                  width: 90,
                  height: 90,
                  objectFit: 'contain',
                  border: '1px solid #d7e3df',
                  borderRadius: 12,
                  padding: 8,
                  background: '#fff',
                }}
              />
            </div>
          )}
        </div>

        <div className="dashboard-card" style={{ marginTop: 20 }}>
          <div className="card-heading">
            <div>
              <h2>Classes Available</h2>
              <p>Select the classes offered by this school.</p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: 10,
            }}
          >
            {Array.from({ length: 12 }, (_, index) => String(index + 1)).map(
              (classNumber) => {
                const selected = form.classesAvailable.includes(classNumber);

                return (
                  <label
                    key={classNumber}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 14px',
                      border: selected
                        ? '1px solid #2f7d6b'
                        : '1px solid #d7e3df',
                      borderRadius: 10,
                      background: selected ? '#edf8f4' : '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleClass(classNumber)}
                    />
                    <span>Class {classNumber}</span>
                  </label>
                );
              }
            )}
          </div>

          <div className="form-actions" style={{ marginTop: 20 }}>
            {savedMessage && (
              <span style={{ color: '#2f7d6b', fontWeight: 700 }}>
                {savedMessage}
              </span>
            )}

            <button type="submit" className="primary-button">
              Save School Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function TeachersPage({ schoolProfile }: { schoolProfile: SchoolProfile }) {
  const [teachers, setTeachers] = useState<Teacher[]>(demoTeachers);
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(
    demoTeacherAssignments
  );
  const [activeTab, setActiveTab] = useState<'teachers' | 'assignments'>(
    'teachers'
  );
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    employeeId: '',
    mobile: '',
    email: '',
    loginId: '',
    password: '',
  });
  const [assignmentForm, setAssignmentForm] = useState({
    teacherId: '',
    type: 'Subject Teacher' as 'Class Teacher' | 'Subject Teacher',
    className: '',
    section: '',
    stream: '',
    subject: '',
  });

  const academicSession = schoolProfile.academicSession || '2026–2027';
  const classes = schoolProfile.classesAvailable.length
    ? schoolProfile.classesAvailable
    : Array.from({ length: 12 }, (_, index) => String(index + 1));
  const subjects = [
    'Hindi',
    'English',
    'Mathematics',
    'Science',
    'Social Science',
    'Computer',
    'Sanskrit',
    'General Knowledge',
    'Physical Education',
  ];

  useEffect(() => {
    const savedTeachers = localStorage.getItem('shiksha_teachers');
    const savedAssignments = localStorage.getItem(
      'shiksha_teacher_assignments'
    );

    if (savedTeachers) {
      try {
        const parsed = JSON.parse(savedTeachers) as Teacher[];
        if (Array.isArray(parsed)) setTeachers(parsed);
      } catch {
        setTeachers(demoTeachers);
      }
    }

    if (savedAssignments) {
      try {
        const parsed = JSON.parse(savedAssignments) as TeacherAssignment[];
        if (Array.isArray(parsed)) setAssignments(parsed);
      } catch {
        setAssignments(demoTeacherAssignments);
      }
    }
  }, []);

  const saveTeachers = (next: Teacher[]) => {
    setTeachers(next);
    localStorage.setItem('shiksha_teachers', JSON.stringify(next));
  };

  const saveAssignments = (next: TeacherAssignment[]) => {
    setAssignments(next);
    localStorage.setItem('shiksha_teacher_assignments', JSON.stringify(next));
  };

  const resetTeacherForm = () => {
    setTeacherForm({
      name: '',
      employeeId: '',
      mobile: '',
      email: '',
      loginId: '',
      password: '',
    });
    setEditingTeacherId(null);
  };

  const resetAssignmentForm = () => {
    setAssignmentForm({
      teacherId: '',
      type: 'Subject Teacher',
      className: '',
      section: '',
      stream: '',
      subject: '',
    });
  };

  const handleTeacherSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = teacherForm.name.trim();
    const employeeId = teacherForm.employeeId.trim();
    const mobile = teacherForm.mobile.trim();
    const loginId = teacherForm.loginId.trim();
    const password = teacherForm.password.trim();

    if (!name || !employeeId || !mobile || !loginId || !password) {
      alert('Please fill all required teacher details.');
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert('Teacher mobile number must contain 10 digits.');
      return;
    }

    const duplicateLogin = teachers.some(
      (teacher) =>
        teacher.loginId.toLowerCase() === loginId.toLowerCase() &&
        teacher.id !== editingTeacherId
    );

    if (duplicateLogin) {
      alert(
        'This Login ID already exists. One teacher should have only one permanent Login ID.'
      );
      return;
    }

    if (editingTeacherId) {
      const next = teachers.map((teacher) =>
        teacher.id === editingTeacherId
          ? {
              ...teacher,
              name,
              employeeId,
              mobile,
              email: teacherForm.email.trim(),
              loginId,
              password,
            }
          : teacher
      );
      saveTeachers(next);
      alert('Teacher account updated successfully.');
    } else {
      const nextNumber =
        teachers.reduce((max, teacher) => {
          const number = Number(teacher.id.replace('TCH', ''));
          return Number.isNaN(number) ? max : Math.max(max, number);
        }, 0) + 1;

      const newTeacher: Teacher = {
        id: `TCH${String(nextNumber).padStart(3, '0')}`,
        name,
        employeeId,
        mobile,
        email: teacherForm.email.trim(),
        loginId,
        password,
        status: 'Active',
      };

      saveTeachers([...teachers, newTeacher]);
      alert(
        'Teacher account created successfully. This Login ID can be assigned to multiple classes/subjects.'
      );
    }

    resetTeacherForm();
    setShowTeacherForm(false);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacherId(teacher.id);
    setTeacherForm({
      name: teacher.name,
      employeeId: teacher.employeeId,
      mobile: teacher.mobile,
      email: teacher.email,
      loginId: teacher.loginId,
      password: teacher.password,
    });
    setShowTeacherForm(true);
  };

  const handleToggleTeacher = (teacherId: string) => {
    const next = teachers.map((teacher) =>
      teacher.id === teacherId
        ? {
            ...teacher,
            status: (teacher.status === 'Active'
              ? 'Inactive'
              : 'Active') as Teacher['status'],
          }
        : teacher
    );
    saveTeachers(next);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    const teacher = teachers.find((item) => item.id === teacherId);
    if (!teacher) return;

    const linkedAssignments = assignments.filter(
      (assignment) => assignment.teacherId === teacherId
    );

    const message = linkedAssignments.length
      ? `${teacher.name} has ${linkedAssignments.length} assignment(s). Delete the teacher and all linked assignments?`
      : `Delete teacher account for ${teacher.name}?`;

    if (!window.confirm(message)) return;

    saveTeachers(teachers.filter((item) => item.id !== teacherId));
    saveAssignments(assignments.filter((item) => item.teacherId !== teacherId));
  };

  const handleAssignmentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !assignmentForm.teacherId ||
      !assignmentForm.className ||
      !assignmentForm.section
    ) {
      alert('Please select teacher, class and section.');
      return;
    }

    if (assignmentForm.type === 'Subject Teacher' && !assignmentForm.subject) {
      alert('Please select a subject.');
      return;
    }

    if (assignmentForm.type === 'Class Teacher') {
      const existingClassTeacher = assignments.find(
        (assignment) =>
          assignment.type === 'Class Teacher' &&
          assignment.className === assignmentForm.className &&
          assignment.section === assignmentForm.section &&
          assignment.academicSession === academicSession
      );

      if (existingClassTeacher) {
        alert(
          'This class and section already has a Class Teacher assignment for this academic session.'
        );
        return;
      }
    }

    const duplicateAssignment = assignments.some(
      (assignment) =>
        assignment.teacherId === assignmentForm.teacherId &&
        assignment.type === assignmentForm.type &&
        assignment.className === assignmentForm.className &&
        assignment.section === assignmentForm.section &&
        (assignment.stream || '') === (assignmentForm.stream || '') &&
        assignment.subject === assignmentForm.subject &&
        assignment.academicSession === academicSession
    );

    if (duplicateAssignment) {
      alert('This exact assignment already exists for this teacher.');
      return;
    }

    const nextNumber =
      assignments.reduce((max, assignment) => {
        const number = Number(assignment.id.replace('ASG', ''));
        return Number.isNaN(number) ? max : Math.max(max, number);
      }, 0) + 1;

    const newAssignment: TeacherAssignment = {
      id: `ASG${String(nextNumber).padStart(3, '0')}`,
      teacherId: assignmentForm.teacherId,
      type: assignmentForm.type,
      className: assignmentForm.className,
      section: assignmentForm.section,
      stream: ['11', '12'].includes(assignmentForm.className)
        ? assignmentForm.stream
        : '',
      subject:
        assignmentForm.type === 'Class Teacher' ? '' : assignmentForm.subject,
      academicSession,
    };

    saveAssignments([...assignments, newAssignment]);
    resetAssignmentForm();
    setShowAssignmentForm(false);
    alert('Teacher assignment saved successfully.');
  };

  const removeAssignment = (assignmentId: string) => {
    if (!window.confirm('Remove this teacher assignment?')) return;
    saveAssignments(assignments.filter((item) => item.id !== assignmentId));
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      teacher.name.toLowerCase().includes(q) ||
      teacher.employeeId.toLowerCase().includes(q) ||
      teacher.loginId.toLowerCase().includes(q)
    );
  });

  const getTeacher = (teacherId: string) =>
    teachers.find((teacher) => teacher.id === teacherId);

  return (
    <div className="students-page">
      <div className="module-header">
        <div>
          <p className="eyebrow">STAFF & ASSIGNMENT MANAGEMENT</p>
          <h1>Teachers</h1>
          <p>
            Create one permanent teacher account and assign that same account to
            multiple classes and subjects.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              resetTeacherForm();
              setShowTeacherForm((value) => !value);
              setShowAssignmentForm(false);
            }}
          >
            {showTeacherForm ? 'Close Teacher Form' : '+ Add Teacher'}
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              resetAssignmentForm();
              setShowAssignmentForm((value) => !value);
              setShowTeacherForm(false);
            }}
          >
            {showAssignmentForm ? 'Close Assignment' : '+ Assign Teacher'}
          </button>
        </div>
      </div>

      <div className="notice-banner">
        <div>
          <strong>One Teacher = One Permanent Login</strong>
          <p>
            The same teacher account can be assigned to Class 3 English, Class 5
            Maths, or any other permitted class/subject without creating another
            login.
          </p>
        </div>
      </div>

      {showTeacherForm && (
        <div className="dashboard-card" style={{ marginBottom: 20 }}>
          <div className="card-heading">
            <div>
              <h2>
                {editingTeacherId
                  ? 'Edit Teacher Account'
                  : 'Create Teacher Account'}
              </h2>
              <p>
                Login credentials belong to the teacher, not to an individual
                class or subject.
              </p>
            </div>
          </div>

          <form className="student-form" onSubmit={handleTeacherSubmit}>
            <div className="form-group">
              <label htmlFor="teacher-name">Teacher Name *</label>
              <input
                id="teacher-name"
                value={teacherForm.name}
                onChange={(event) =>
                  setTeacherForm({ ...teacherForm, name: event.target.value })
                }
                placeholder="Enter teacher name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="teacher-employee-id">Employee ID *</label>
              <input
                id="teacher-employee-id"
                value={teacherForm.employeeId}
                onChange={(event) =>
                  setTeacherForm({
                    ...teacherForm,
                    employeeId: event.target.value,
                  })
                }
                placeholder="Example: EMP006"
              />
            </div>
            <div className="form-group">
              <label htmlFor="teacher-mobile">Mobile *</label>
              <input
                id="teacher-mobile"
                inputMode="numeric"
                maxLength={10}
                value={teacherForm.mobile}
                onChange={(event) =>
                  setTeacherForm({
                    ...teacherForm,
                    mobile: event.target.value.replace(/\D/g, ''),
                  })
                }
                placeholder="10 digit mobile"
              />
            </div>
            <div className="form-group">
              <label htmlFor="teacher-email">Email</label>
              <input
                id="teacher-email"
                type="email"
                value={teacherForm.email}
                onChange={(event) =>
                  setTeacherForm({ ...teacherForm, email: event.target.value })
                }
                placeholder="teacher@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="teacher-login-id">Permanent Login ID *</label>
              <input
                id="teacher-login-id"
                value={teacherForm.loginId}
                onChange={(event) =>
                  setTeacherForm({
                    ...teacherForm,
                    loginId: event.target.value,
                  })
                }
                placeholder="Unique teacher Login ID"
              />
            </div>
            <div className="form-group">
              <label htmlFor="teacher-password">Password / Passcode *</label>
              <input
                id="teacher-password"
                type="text"
                value={teacherForm.password}
                onChange={(event) =>
                  setTeacherForm({
                    ...teacherForm,
                    password: event.target.value,
                  })
                }
                placeholder="Initial password"
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  resetTeacherForm();
                  setShowTeacherForm(false);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="primary-button">
                {editingTeacherId ? 'Update Teacher' : 'Create Teacher'}
              </button>
            </div>
          </form>
        </div>
      )}

      {showAssignmentForm && (
        <div className="dashboard-card" style={{ marginBottom: 20 }}>
          <div className="card-heading">
            <div>
              <h2>Assign Teacher</h2>
              <p>
                Choose an existing teacher account. Do not create another
                account for another class or subject.
              </p>
            </div>
          </div>

          <form className="student-form" onSubmit={handleAssignmentSubmit}>
            <div className="form-group">
              <label htmlFor="assignment-teacher">Teacher *</label>
              <select
                id="assignment-teacher"
                value={assignmentForm.teacherId}
                onChange={(event) =>
                  setAssignmentForm({
                    ...assignmentForm,
                    teacherId: event.target.value,
                  })
                }
              >
                <option value="">Select existing teacher</option>
                {teachers
                  .filter((teacher) => teacher.status === 'Active')
                  .map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} — {teacher.employeeId}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="assignment-type">Assignment Type *</label>
              <select
                id="assignment-type"
                value={assignmentForm.type}
                onChange={(event) =>
                  setAssignmentForm({
                    ...assignmentForm,
                    type: event.target.value as
                      | 'Class Teacher'
                      | 'Subject Teacher',
                    stream: '',
                    subject: '',
                  })
                }
              >
                <option value="Class Teacher">Class Teacher</option>
                <option value="Subject Teacher">Subject Teacher</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="assignment-class">Class *</label>
              <select
                id="assignment-class"
                value={assignmentForm.className}
                onChange={(event) =>
                  setAssignmentForm({
                    ...assignmentForm,
                    className: event.target.value,
                    stream: '',
                  })
                }
              >
                <option value="">Select Class</option>
                {classes.map((classNumber) => (
                  <option key={classNumber} value={classNumber}>
                    Class {classNumber}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="assignment-section">Section *</label>
              <select
                id="assignment-section"
                value={assignmentForm.section}
                onChange={(event) =>
                  setAssignmentForm({
                    ...assignmentForm,
                    section: event.target.value,
                  })
                }
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            {['11', '12'].includes(assignmentForm.className) && (
              <div className="form-group">
                <label htmlFor="assignment-stream">Stream *</label>
                <select
                  id="assignment-stream"
                  value={assignmentForm.stream}
                  onChange={(event) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      stream: event.target.value,
                    })
                  }
                >
                  <option value="">Select Stream</option>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>
            )}

            {assignmentForm.type === 'Subject Teacher' && (
              <div className="form-group">
                <label htmlFor="assignment-subject">Subject *</label>
                <select
                  id="assignment-subject"
                  value={assignmentForm.subject}
                  onChange={(event) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      subject: event.target.value,
                    })
                  }
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  resetAssignmentForm();
                  setShowAssignmentForm(false);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="primary-button">
                Save Assignment
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="student-summary">
        <div className="summary-card">
          <span>Total Teacher Accounts</span>
          <strong>{teachers.length}</strong>
        </div>
        <div className="summary-card">
          <span>Active Teachers</span>
          <strong>
            {teachers.filter((teacher) => teacher.status === 'Active').length}
          </strong>
        </div>
        <div className="summary-card">
          <span>Class Teacher Assignments</span>
          <strong>
            {assignments.filter((item) => item.type === 'Class Teacher').length}
          </strong>
        </div>
        <div className="summary-card">
          <span>Subject Assignments</span>
          <strong>
            {
              assignments.filter((item) => item.type === 'Subject Teacher')
                .length
            }
          </strong>
        </div>
      </div>

      <div className="dashboard-card">
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginBottom: 18,
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            className={
              activeTab === 'teachers' ? 'primary-button' : 'secondary-button'
            }
            onClick={() => setActiveTab('teachers')}
          >
            Teacher Accounts
          </button>
          <button
            type="button"
            className={
              activeTab === 'assignments'
                ? 'primary-button'
                : 'secondary-button'
            }
            onClick={() => setActiveTab('assignments')}
          >
            Class & Subject Assignments
          </button>
        </div>

        {activeTab === 'teachers' ? (
          <>
            <div className="student-filters">
              <input
                type="text"
                placeholder="Search teacher, Employee ID or Login ID..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="student-table-wrapper">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Teacher</th>
                    <th>Employee ID</th>
                    <th>Mobile</th>
                    <th>Permanent Login ID</th>
                    <th>Assignments</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => {
                    const teacherAssignments = assignments.filter(
                      (item) => item.teacherId === teacher.id
                    );
                    return (
                      <tr key={teacher.id}>
                        <td>
                          <strong>{teacher.name}</strong>
                          <br />
                          <small>{teacher.id}</small>
                        </td>
                        <td>{teacher.employeeId}</td>
                        <td>{teacher.mobile}</td>
                        <td>{teacher.loginId}</td>
                        <td>{teacherAssignments.length}</td>
                        <td>
                          <span className="status-badge">{teacher.status}</span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              type="button"
                              className="secondary-button"
                              onClick={() => handleEditTeacher(teacher)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="secondary-button"
                              onClick={() => handleToggleTeacher(teacher.id)}
                            >
                              {teacher.status === 'Active'
                                ? 'Deactivate'
                                : 'Activate'}
                            </button>
                            <button
                              type="button"
                              className="delete-button"
                              onClick={() => handleDeleteTeacher(teacher.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredTeachers.length === 0 && (
                <div className="empty-state">No teacher accounts found.</div>
              )}
            </div>
          </>
        ) : (
          <div className="student-table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Type</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Stream</th>
                  <th>Subject</th>
                  <th>Academic Session</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => {
                  const teacher = getTeacher(assignment.teacherId);
                  return (
                    <tr key={assignment.id}>
                      <td>{teacher?.name || 'Teacher account not found'}</td>
                      <td>{assignment.type}</td>
                      <td>Class {assignment.className}</td>
                      <td>{assignment.section}</td>
                      <td>{assignment.subject || '—'}</td>
                      <td>{assignment.academicSession}</td>
                      <td>
                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => removeAssignment(assignment.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {assignments.length === 0 && (
              <div className="empty-state">No teacher assignments found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(demoStudents);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newStudent, setNewStudent] = useState({
    name: '',
    studentClass: '',
    section: '',
    stream: '',
    mobile: '',
  });

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.id.toLowerCase().includes(searchText);

    const matchesClass =
      classFilter === 'All' || student.className === classFilter;

    return matchesSearch && matchesClass;
  });

  const resetForm = () => {
    setNewStudent({
      name: '',
      studentClass: '',
      section: '',
      stream: '',
      mobile: '',
    });

    setEditingId(null);
  };

  const handleAddStudent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const studentName = newStudent.name.trim();
    const mobileNumber = newStudent.mobile.trim();

    if (
      !studentName ||
      !newStudent.studentClass ||
      !newStudent.section ||
      !mobileNumber
    ) {
      alert('Please fill all student details.');
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (editingId) {
      setStudents((previousStudents) =>
        previousStudents.map((student) =>
          student.id === editingId
            ? {
                ...student,
                name: studentName,
                className: newStudent.studentClass,
                section: newStudent.section,
                parentMobile: mobileNumber,
              }
            : student
        )
      );

      alert('Student updated successfully!');
    } else {
      const nextNumber =
        students.reduce((maximum, student) => {
          const numberPart = Number(student.id.split('-').pop());

          return Number.isNaN(numberPart)
            ? maximum
            : Math.max(maximum, numberPart);
        }, 0) + 1;

      const studentToAdd: Student = {
        id: `SPS001-2026-${String(nextNumber).padStart(4, '0')}`,
        name: studentName,
        className: newStudent.studentClass,
        section: newStudent.section,
        parentMobile: mobileNumber,
        status: 'Active',
      };

      setStudents((previousStudents) => [...previousStudents, studentToAdd]);

      alert('Student added successfully!');
    }

    resetForm();
    setShowForm(false);
  };

  const handleEditStudent = (student: Student) => {
    setEditingId(student.id);

    setNewStudent({
      name: student.name,
      studentClass: student.className,
      section: student.section,
      stream: student.stream || '',
      mobile: student.parentMobile.replace(/\*/g, ''),
    });

    setShowForm(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    const student = students.find(
      (currentStudent) => currentStudent.id === studentId
    );

    if (!student) {
      return;
    }

    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!shouldDelete) {
      return;
    }

    setStudents((previousStudents) =>
      previousStudents.filter(
        (currentStudent) => currentStudent.id !== studentId
      )
    );

    if (editingId === studentId) {
      resetForm();
      setShowForm(false);
    }

    alert('Student deleted successfully!');
  };

  const handleCancelForm = () => {
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="students-page">
      <div className="module-header">
        <div>
          <p className="eyebrow">STUDENT MANAGEMENT</p>
          <h1>Students</h1>
          <p>Manage your school's student records.</p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => {
            if (showForm) {
              handleCancelForm();
            } else {
              resetForm();
              setShowForm(true);
            }
          }}
        >
          {showForm ? 'Close Form' : '+ Add Student'}
        </button>
      </div>

      {showForm && (
        <div className="dashboard-card add-student-form-card">
          <div className="card-heading">
            <div>
              <h2>{editingId ? 'Edit Student' : 'Add New Student'}</h2>
              <p>
                {editingId
                  ? 'Update student details below.'
                  : 'Enter student details below.'}
              </p>
            </div>
          </div>

          <form className="student-form" onSubmit={handleAddStudent}>
            <div className="form-group">
              <label htmlFor="student-name">Student Name</label>

              <input
                id="student-name"
                type="text"
                placeholder="Enter student name"
                value={newStudent.name}
                onChange={(event) =>
                  setNewStudent((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="student-class">Class</label>

              <select
                id="student-class"
                value={newStudent.studentClass}
                onChange={(event) =>
                  setNewStudent((previous) => ({
                    ...previous,
                    studentClass: event.target.value,
                  }))
                }
              >
                <option value="">Select Class</option>

                {Array.from({ length: 12 }, (_, index) => index + 1).map(
                  (classNumber) => (
                    <option key={classNumber} value={String(classNumber)}>
                      Class {classNumber}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="student-section">Section</label>

              <select
                id="student-section"
                value={newStudent.section}
                onChange={(event) =>
                  setNewStudent((previous) => ({
                    ...previous,
                    section: event.target.value,
                  }))
                }
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="student-mobile">Parent Mobile Number</label>

              <input
                id="student-mobile"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter parent mobile number"
                value={newStudent.mobile}
                onChange={(event) => {
                  const onlyNumbers = event.target.value.replace(/\D/g, '');

                  setNewStudent((previous) => ({
                    ...previous,
                    mobile: onlyNumbers,
                  }));
                }}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={handleCancelForm}
              >
                Cancel
              </button>

              <button type="submit" className="primary-button">
                {editingId ? 'Update Student' : 'Save Student'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="student-summary">
        <div className="summary-card">
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </div>

        <div className="summary-card">
          <span>Active Students</span>
          <strong>
            {students.filter((student) => student.status === 'Active').length}
          </strong>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="student-filters">
          <input
            type="text"
            placeholder="Search student name or ID..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={classFilter}
            onChange={(event) => setClassFilter(event.target.value)}
          >
            <option value="All">All Classes</option>

            {Array.from({ length: 12 }, (_, index) => index + 1).map(
              (classNumber) => (
                <option key={classNumber} value={String(classNumber)}>
                  Class {classNumber}
                </option>
              )
            )}
          </select>
        </div>

        <div className="student-table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Parent Mobile</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.className}</td>
                  <td>{student.section}</td>
                  <td>{student.parentMobile}</td>

                  <td>
                    <span className="status-badge">{student.status}</span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => handleEditStudent(student)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <div className="empty-state">No student records found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function StudentDashboard({ userName }: { userName: string }) {
  return (
    <div className="dashboard-home">
      <div className="page-heading">
        <div>
          <p className="eyebrow">STUDENT PORTAL</p>
          <h1>Welcome, {userName} 👋</h1>
          <p>View your school information and academic progress.</p>
        </div>
      </div>

      <div className="notice-banner">
        <div>
          <strong>Welcome to SHIKSHA ONE!</strong>
          <p>Your student dashboard is ready.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Fees Status</span>
          <strong>Paid</strong>
          <small>Current fees status</small>
        </div>

        <div className="stat-card">
          <span>Attendance</span>
          <strong>85%</strong>
          <small>Overall attendance</small>
        </div>

        <div className="stat-card">
          <span>Results</span>
          <strong>View</strong>
          <small>Exam marks and results</small>
        </div>

        <div className="stat-card">
          <span>Academic Progress</span>
          <strong>Good</strong>
          <small>Learning overview</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-heading">
            <h2>Student Information</h2>
          </div>

          <div className="school-profile">
            <p>
              <strong>Student Name:</strong> {userName}
            </p>

            <p>
              <strong>Class:</strong> 6
            </p>

            <p>
              <strong>Section:</strong> A
            </p>

            <p>
              <strong>Roll Number:</strong> 01
            </p>

            <p>
              <strong>Academic Year:</strong> 2026–2027
            </p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <h2>Quick Overview</h2>
          </div>

          <div className="school-profile">
            <p>
              <strong>School:</strong> Demo Public School
            </p>

            <p>
              <strong>School Code:</strong> SPS001
            </p>

            <p>
              <strong>Last Exam:</strong> Demo data
            </p>

            <p>
              <strong>Next Feature:</strong> Detailed Results
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-heading">
          <h2>Academic Activity</h2>
        </div>

        <div className="school-profile">
          <p>📚 Subject-wise marks will appear here.</p>
          <p>🗓️ Attendance history will appear here.</p>
          <p>📝 Examination results will appear here.</p>
        </div>
      </div>
    </div>
  );
}

function TeacherDashboard({
  userName,
  role,
  schoolProfile,
}: {
  userName: string;
  role: Role;
  schoolProfile: SchoolProfile;
}) {
  const [teachers] = useState<Teacher[]>(demoTeachers);
  const [assignments] = useState<TeacherAssignment[]>(demoTeacherAssignments);
  const [students] = useState<Student[]>(demoStudents);
  const [activeWork, setActiveWork] = useState<
    'dashboard' | 'marks' | 'attendance'
  >('dashboard');
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [obtainedMarks, setObtainedMarks] = useState<Record<string, string>>(
    {}
  );
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [attendanceStatus, setAttendanceStatus] = useState<
    Record<string, 'Present' | 'Absent' | 'Leave'>
  >({});

  const teacher = teachers.find(
    (item) => item.name.toLowerCase() === userName.toLowerCase()
  );
  const teacherAssignments = teacher
    ? assignments.filter((item) => item.teacherId === teacher.id)
    : [];
  const classTeacherAssignments = teacherAssignments.filter(
    (item) => item.type === 'Class Teacher'
  );
  const subjectAssignments = teacherAssignments.filter(
    (item) => item.type === 'Subject Teacher'
  );

  const assignmentKey = (item: TeacherAssignment) =>
    `${item.className}-${item.section}-${item.stream || ''}`;

  // Assigned Students are system-derived from the teacher's assignment.
  // Class 1–10: whole class + section. Class 11–12: whole stream + section.
  const assignedClassKeys = Array.from(
    new Set(teacherAssignments.map(assignmentKey))
  );

  const assignedStudents = students.filter((student) => {
    const key = `${student.className}-${student.section}-${
      student.stream || ''
    }`;
    return assignedClassKeys.includes(key);
  });

  const markClassOptions = Array.from(
    new Set(subjectAssignments.map(assignmentKey))
  );

  const selectedClassAssignments = subjectAssignments.filter(
    (item) => assignmentKey(item) === selectedClass
  );

  const markStudents = selectedClass
    ? students.filter(
        (student) =>
          `${student.className}-${student.section}-${student.stream || ''}` ===
          selectedClass
      )
    : [];

  const attendanceClassOptions = Array.from(
    new Set(classTeacherAssignments.map(assignmentKey))
  );

  const attendanceStudents =
    selectedClass && activeWork === 'attendance'
      ? students.filter(
          (student) =>
            `${student.className}-${student.section}-${
              student.stream || ''
            }` === selectedClass
        )
      : [];

  useEffect(() => {
    if (role === 'Subject Teacher' && activeWork === 'attendance') {
      setActiveWork('dashboard');
    }
  }, [role, activeWork]);

  useEffect(() => {
    if (selectedClassAssignments.length === 1) {
      setSelectedSubject(selectedClassAssignments[0].subject);
    } else if (!selectedClass) {
      setSelectedSubject('');
    } else if (
      !selectedClassAssignments.some((item) => item.subject === selectedSubject)
    ) {
      setSelectedSubject('');
    }
  }, [selectedClass, selectedClassAssignments, selectedSubject]);

  const openMarks = () => {
    setActiveWork('marks');
    setSelectedExam('');
    setSelectedClass('');
    setSelectedSubject('');
    setObtainedMarks({});
  };

  const openAttendance = () => {
    if (classTeacherAssignments.length === 0) return;
    setActiveWork('attendance');
    setSelectedClass('');
    setAttendanceStatus({});
  };

  const submitMarks = () => {
    if (!selectedExam || !selectedClass || !selectedSubject) {
      alert('Please select Exam, Class and Subject.');
      return;
    }

    const invalidStudent = markStudents.find((student) => {
      const value = obtainedMarks[student.id];
      if (value === undefined || value.trim() === '') return false;
      const number = Number(value);
      return Number.isNaN(number) || number < 0 || number > 100;
    });

    if (invalidStudent) {
      alert(`Marks for ${invalidStudent.name} must be between 0 and 100.`);
      return;
    }

    alert(
      `Marks submitted for ${markStudents.length} student(s) — ${selectedExam}, Class ${selectedClass}, ${selectedSubject}.`
    );
    setActiveWork('dashboard');
  };

  const saveAttendance = () => {
    if (!selectedClass || !attendanceDate) {
      alert('Please select Class and Date.');
      return;
    }

    const incomplete = attendanceStudents.some(
      (student) => !attendanceStatus[student.id]
    );
    if (incomplete) {
      alert('Please mark attendance for every student before saving.');
      return;
    }

    alert(
      `Attendance saved for ${attendanceStudents.length} student(s) for ${attendanceDate}.`
    );
    setActiveWork('dashboard');
  };

  if (activeWork === 'marks') {
    return (
      <div className="dashboard-page">
        <div className="page-heading">
          <div>
            <p className="eyebrow">MARKS ENTRY</p>
            <h1>Add Marks</h1>
            <p>
              Enter subject marks only for the classes and subjects assigned to
              you.
            </p>
          </div>
          <button
            className="secondary-button"
            type="button"
            onClick={() => setActiveWork('dashboard')}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="dashboard-card">
          <div className="student-form">
            <div className="form-group">
              <label htmlFor="teacher-exam">Choose Exam *</label>
              <select
                id="teacher-exam"
                value={selectedExam}
                onChange={(event) => setSelectedExam(event.target.value)}
              >
                <option value="">Select Exam</option>
                <option value="Unit Test 1">Unit Test 1</option>
                <option value="Half Yearly">Half Yearly</option>
                <option value="Unit Test 2">Unit Test 2</option>
                <option value="Annual Exam">Annual Exam</option>
                <option value="Other Exam">Other Exam</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="teacher-class">Choose Class *</label>
              <select
                id="teacher-class"
                value={selectedClass}
                onChange={(event) => setSelectedClass(event.target.value)}
              >
                <option value="">Select Class</option>
                {markClassOptions.map((classKey) => {
                  const [className, section, stream] = classKey.split('-');
                  return (
                    <option key={classKey} value={classKey}>
                      Class {className}-{section}
                      {stream ? ` — ${stream}` : ''}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="teacher-subject">Assigned Subject *</label>
              <select
                id="teacher-subject"
                value={selectedSubject}
                onChange={(event) => setSelectedSubject(event.target.value)}
                disabled={
                  !selectedClass || selectedClassAssignments.length <= 1
                }
              >
                <option value="">Select Subject</option>
                {Array.from(
                  new Set(selectedClassAssignments.map((item) => item.subject))
                ).map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              {selectedClass && selectedClassAssignments.length === 1 && (
                <small>
                  Subject automatically selected from your assignment.
                </small>
              )}
            </div>
          </div>
        </div>

        {selectedExam && selectedClass && selectedSubject && (
          <div className="dashboard-card" style={{ marginTop: 20 }}>
            <div className="card-heading">
              <div>
                <h2>Marks Entry — Class {selectedClass}</h2>
                <p>
                  Subject: <strong>{selectedSubject}</strong> · Total Marks:{' '}
                  <strong>100</strong>
                </p>
              </div>
            </div>

            <div className="student-table-wrapper">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Roll No.</th>
                    <th>Student Name</th>
                    <th>Total Marks</th>
                    <th>Obtained Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {markStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>{student.name}</strong>
                      </td>
                      <td>100</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={obtainedMarks[student.id] ?? ''}
                          onChange={(event) =>
                            setObtainedMarks((previous) => ({
                              ...previous,
                              [student.id]: event.target.value,
                            }))
                          }
                          placeholder="Enter marks"
                          style={{ width: 140 }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {markStudents.length === 0 && (
              <div className="empty-state">
                No students found in this class.
              </div>
            )}

            <div className="form-actions" style={{ marginTop: 20 }}>
              <button
                className="primary-button"
                type="button"
                onClick={submitMarks}
              >
                SUBMIT MARKS
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (activeWork === 'attendance') {
    return (
      <div className="dashboard-page">
        <div className="page-heading">
          <div>
            <p className="eyebrow">DAILY ATTENDANCE</p>
            <h1>Attendance</h1>
            <p>
              Attendance is available only for your Class Teacher assignment.
            </p>
          </div>
          <button
            className="secondary-button"
            type="button"
            onClick={() => setActiveWork('dashboard')}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="dashboard-card">
          <div className="student-form">
            <div className="form-group">
              <label htmlFor="attendance-class">Select Class *</label>
              <select
                id="attendance-class"
                value={selectedClass}
                onChange={(event) => setSelectedClass(event.target.value)}
              >
                <option value="">Select Class</option>
                {attendanceClassOptions.map((classKey) => {
                  const [className, section, stream] = classKey.split('-');
                  return (
                    <option key={classKey} value={classKey}>
                      Class {className}-{section}
                      {stream ? ` — ${stream}` : ''}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="attendance-date">Select Date *</label>
              <input
                id="attendance-date"
                type="date"
                value={attendanceDate}
                onChange={(event) => setAttendanceDate(event.target.value)}
              />
            </div>
          </div>
        </div>

        {selectedClass && (
          <div className="dashboard-card" style={{ marginTop: 20 }}>
            <div className="student-table-wrapper">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Roll No.</th>
                    <th>Student Name</th>
                    <th>Present</th>
                    <th>Absent</th>
                    <th>Leave</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>{student.name}</strong>
                      </td>
                      {(['Present', 'Absent', 'Leave'] as const).map(
                        (status) => (
                          <td key={status}>
                            <input
                              type="radio"
                              name={`attendance-${student.id}`}
                              checked={attendanceStatus[student.id] === status}
                              onChange={() =>
                                setAttendanceStatus((previous) => ({
                                  ...previous,
                                  [student.id]: status,
                                }))
                              }
                            />
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {attendanceStudents.length === 0 && (
              <div className="empty-state">
                No students found in this class.
              </div>
            )}
            <div className="form-actions" style={{ marginTop: 20 }}>
              <button
                className="primary-button"
                type="button"
                onClick={saveAttendance}
              >
                SAVE ATTENDANCE
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <p className="eyebrow">TEACHER WORKSPACE</p>
      <h1>Welcome, {userName}</h1>
      <p className="page-subtitle">
        This dashboard shows only the classes, subjects and students assigned to
        you.
      </p>

      <div className="student-summary">
        <div className="summary-card">
          <span>Your Role</span>
          <strong>{role}</strong>
        </div>
        <div className="summary-card">
          <span>Assigned Classes</span>
          <strong>{assignedClassKeys.length}</strong>
        </div>
        <div className="summary-card">
          <span>Subject Assignments</span>
          <strong>{subjectAssignments.length}</strong>
        </div>
        <div className="summary-card">
          <span>Assigned Students</span>
          <strong>{assignedStudents.length}</strong>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-heading">
            <h2>Your Assigned Class</h2>
          </div>
          {classTeacherAssignments.length > 0 ? (
            <div className="school-profile">
              {classTeacherAssignments.map((item) => (
                <div key={item.id} style={{ marginBottom: 12 }}>
                  <strong>
                    Class {item.className}-{item.section}
                  </strong>
                  <p>Role: Class Teacher</p>
                  <small>Academic Session: {item.academicSession}</small>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">No Class Teacher Assignment</div>
          )}
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <h2>Your Assigned Classes & Subjects</h2>
          </div>
          {subjectAssignments.length > 0 ? (
            <div className="student-table-wrapper">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectAssignments.map((item) => (
                    <tr key={item.id}>
                      <td>Class {item.className}</td>
                      <td>{item.section}</td>
                      <td>
                        <strong>{item.subject}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">No Subject Assignment</div>
          )}
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-heading">
          <h2>Assigned Students</h2>
        </div>
        <p className="page-subtitle">
          Students are automatically shown from your assigned class/section; for
          Classes 11–12, the assigned stream is included.
        </p>
        {assignedStudents.length > 0 ? (
          <div className="student-table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Stream</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assignedStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>
                      <strong>{student.name}</strong>
                    </td>
                    <td>Class {student.className}</td>
                    <td>{student.section}</td>
                    <td>{student.stream || '—'}</td>
                    <td>{student.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            No students are currently in your assigned class/stream.
          </div>
        )}
      </div>

      <div className="dashboard-card">
        <div className="card-heading">
          <h2>Quick Actions</h2>
        </div>
        <div className="quick-actions">
          {subjectAssignments.length > 0 && (
            <button
              className="primary-button"
              type="button"
              onClick={openMarks}
            >
              + Add Marks
            </button>
          )}
          {classTeacherAssignments.length > 0 && (
            <button
              className="secondary-button"
              type="button"
              onClick={openAttendance}
            >
              🗓️ Attendance
            </button>
          )}
        </div>
        <div className="school-profile" style={{ marginTop: 14 }}>
          {role === 'Subject Teacher' && (
            <p>
              <strong>Subject Teacher permission:</strong> Add Marks for
              assigned class + assigned subject only. Attendance is not
              available.
            </p>
          )}
          {classTeacherAssignments.length > 0 && (
            <p>
              <strong>Class Teacher permission:</strong> Attendance and
              student/class work for your assigned class.
            </p>
          )}
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-heading">
          <h2>School</h2>
        </div>
        <div className="school-profile">
          <p>
            <strong>{schoolProfile.schoolName}</strong>
          </p>
          <p>
            {schoolProfile.schoolCode} · {schoolProfile.academicSession}
          </p>
        </div>
      </div>
    </div>
  );
}

function AccountDashboard({
  userName,
  schoolProfile,
}: {
  userName: string;
  schoolProfile: SchoolProfile;
}) {
  return (
    <div className="dashboard-page">
      <p className="eyebrow">ACCOUNT SECTION</p>
      <h1>Welcome, {userName}</h1>
      <p className="page-subtitle">
        Manage only school financial work assigned to the Account section.
      </p>
      <div className="dashboard-grid">
        {[
          'Student Fees',
          'Fee Collection',
          'Paid Fees',
          'Pending Fees',
          'Receipts',
          'Expenses',
          'Income',
          'Account Reports',
        ].map((item) => (
          <div className="dashboard-card" key={item}>
            <div className="card-heading">
              <h2>{item}</h2>
            </div>
            <p>
              This account module will be connected to the database in the next
              stage.
            </p>
          </div>
        ))}
      </div>
      <div className="dashboard-card">
        <p>
          <strong>School:</strong> {schoolProfile.schoolName}
        </p>
        <p>
          <strong>Academic Session:</strong> {schoolProfile.academicSession}
        </p>
        <p>
          Academic marks and attendance editing are not available from this
          dashboard.
        </p>
      </div>
    </div>
  );
}

function ClassesSubjectsPage() {
  const [classes, setClasses] = useState(demoClasses);
  const [subjects, setSubjects] = useState(demoSubjects);
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [code, setCode] = useState('');

  const addSubject = () => {
    if (!className || !subject.trim()) {
      alert('Please select class and enter subject name.');
      return;
    }
    const duplicate = subjects.some(
      (item) =>
        item.className === className &&
        item.subject.toLowerCase() === subject.trim().toLowerCase()
    );
    if (duplicate) {
      alert('This subject is already added for the selected class.');
      return;
    }
    setSubjects((items) => [
      ...items,
      {
        className,
        subject: subject.trim(),
        code: code.trim() || `SUB-${className}-${items.length + 1}`,
      },
    ]);
    setSubject('');
    setCode('');
  };

  const toggleSection = (className: string) => {
    setClasses((items) =>
      items.map((item) =>
        item.className === className
          ? {
              ...item,
              sections: item.sections.length === 1 ? ['A', 'B'] : ['A'],
            }
          : item
      )
    );
  };

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACADEMIC SETUP</p>
          <h1>Classes & Subjects</h1>
          <p>
            Manage classes, sections and subjects for the current academic
            session.
          </p>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-heading">
          <div>
            <h2>Classes & Sections</h2>
            <p>Classes 11–12 support stream-based student grouping.</p>
          </div>
        </div>
        <div className="student-table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Sections</th>
                <th>Stream</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((item) => (
                <tr key={item.className}>
                  <td>
                    <strong>Class {item.className}</strong>
                  </td>
                  <td>{item.sections.join(', ')}</td>
                  <td>{item.streamRequired ? 'Required' : 'Not Required'}</td>
                  <td>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => toggleSection(item.className)}
                    >
                      Toggle Section
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-card" style={{ marginTop: 20 }}>
        <div className="card-heading">
          <div>
            <h2>Add Subject</h2>
            <p>
              Add subjects class-wise. Teacher assignment will use these
              subjects later.
            </p>
          </div>
        </div>
        <div className="student-form">
          <div className="form-group">
            <label>Class *</label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((item) => (
                <option key={item.className} value={item.className}>
                  Class {item.className}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Subject *</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Mathematics"
            />
          </div>
          <div className="form-group">
            <label>Subject Code</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="primary-button"
              onClick={addSubject}
            >
              ADD SUBJECT
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-card" style={{ marginTop: 20 }}>
        <div className="card-heading">
          <div>
            <h2>Subject List</h2>
          </div>
        </div>
        <div className="student-table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((item) => (
                <tr key={`${item.className}-${item.code}`}>
                  <td>Class {item.className}</td>
                  <td>
                    <strong>{item.subject}</strong>
                  </td>
                  <td>{item.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ExamsPage() {
  const [exams, setExams] = useState(demoExams);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [maxMarks, setMaxMarks] = useState('100');

  const addExam = () => {
    if (!name.trim() || !date || !maxMarks) {
      alert('Please fill exam name, date and maximum marks.');
      return;
    }
    setExams((items) => [
      ...items,
      {
        id: `EX${String(items.length + 1).padStart(3, '0')}`,
        name: name.trim(),
        date,
        maxMarks: Number(maxMarks),
        status: 'Upcoming',
      },
    ]);
    setName('');
    setDate('');
    setMaxMarks('100');
  };

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">EXAM MANAGEMENT</p>
          <h1>Exams</h1>
          <p>Create and manage school examinations.</p>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="card-heading">
          <div>
            <h2>Create Exam</h2>
          </div>
        </div>
        <div className="student-form">
          <div className="form-group">
            <label>Exam Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Half Yearly"
            />
          </div>
          <div className="form-group">
            <label>Exam Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Maximum Marks *</label>
            <input
              type="number"
              min="1"
              value={maxMarks}
              onChange={(e) => setMaxMarks(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="primary-button" onClick={addExam}>
              CREATE EXAM
            </button>
          </div>
        </div>
      </div>
      <div className="dashboard-card" style={{ marginTop: 20 }}>
        <div className="student-table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Exam</th>
                <th>Date</th>
                <th>Maximum Marks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.id}>
                  <td>
                    <strong>{exam.name}</strong>
                  </td>
                  <td>{exam.date}</td>
                  <td>{exam.maxMarks}</td>
                  <td>{exam.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AttendancePage({ role }: { role: Role }) {
  const classTeacherAssignments = demoTeacherAssignments.filter(
    (item) => item.type === 'Class Teacher'
  );
  const isAdmin = role === 'School Admin';
  const availableClasses = isAdmin
    ? Array.from(
        new Set(
          demoStudents.map(
            (s) => `${s.className}-${s.section}-${s.stream || ''}`
          )
        )
      )
    : Array.from(
        new Set(
          classTeacherAssignments.map(
            (a) => `${a.className}-${a.section}-${a.stream || ''}`
          )
        )
      );
  const [selectedClass, setSelectedClass] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<
    Record<string, 'Present' | 'Absent' | 'Leave'>
  >({});
  const students = selectedClass
    ? demoStudents.filter(
        (student) =>
          `${student.className}-${student.section}-${student.stream || ''}` ===
          selectedClass
      )
    : [];

  const save = () => {
    if (!selectedClass || !date) return alert('Please select class and date.');
    if (students.some((student) => !status[student.id]))
      return alert('Please mark attendance for every student.');
    alert(`Attendance saved for ${students.length} student(s).`);
  };

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">DAILY ATTENDANCE</p>
          <h1>Attendance</h1>
          <p>
            {isAdmin
              ? 'Manage attendance for school classes.'
              : 'Take attendance only for your assigned class.'}
          </p>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="student-form">
          <div className="form-group">
            <label>Select Class *</label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setStatus({});
              }}
            >
              <option value="">Select Class</option>
              {availableClasses.map((key) => {
                const [c, sec, stream] = key.split('-');
                return (
                  <option key={key} value={key}>
                    Class {c}-{sec}
                    {stream ? ` — ${stream}` : ''}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      {selectedClass && (
        <div className="dashboard-card" style={{ marginTop: 20 }}>
          <div className="student-table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Roll No.</th>
                  <th>Student Name</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Leave</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{student.name}</strong>
                    </td>
                    {(['Present', 'Absent', 'Leave'] as const).map((value) => (
                      <td key={value}>
                        <input
                          type="radio"
                          name={`att-${student.id}`}
                          checked={status[student.id] === value}
                          onChange={() =>
                            setStatus((old) => ({
                              ...old,
                              [student.id]: value,
                            }))
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="form-actions" style={{ marginTop: 20 }}>
            <button type="button" className="primary-button" onClick={save}>
              SAVE ATTENDANCE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultsPage({ role, userName }: { role: Role; userName: string }) {
  const [exam, setExam] = useState('Unit Test 1');
  const [classKey, setClassKey] = useState('3-A-');
  const [subject, setSubject] = useState(
    role === 'Subject Teacher' ? 'Science' : 'Science'
  );
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const teacher = demoTeachers.find(
    (item) => item.name.toLowerCase() === userName.toLowerCase()
  );
  const assignments =
    role === 'Subject Teacher' && teacher
      ? demoTeacherAssignments.filter(
          (item) =>
            item.teacherId === teacher.id && item.type === 'Subject Teacher'
        )
      : demoTeacherAssignments.filter(
          (item) => item.type === 'Subject Teacher'
        );
  const classOptions = Array.from(
    new Set(
      assignments.map(
        (item) => `${item.className}-${item.section}-${item.stream || ''}`
      )
    )
  );
  const selectedAssignment = assignments.find(
    (item) =>
      `${item.className}-${item.section}-${item.stream || ''}` === classKey &&
      item.subject === subject
  );
  const students = classKey
    ? demoStudents.filter(
        (student) =>
          `${student.className}-${student.section}-${student.stream || ''}` ===
          classKey
      )
    : [];

  useEffect(() => {
    const first = assignments[0];
    if (first) {
      setClassKey(`${first.className}-${first.section}-${first.stream || ''}`);
      setSubject(first.subject);
    }
  }, [userName, role]);

  const saveMarks = () => {
    if (!exam || !classKey || !subject)
      return alert('Please select exam, class and subject.');
    const bad = students.find(
      (student) =>
        marks[student.id] &&
        (Number(marks[student.id]) < 0 || Number(marks[student.id]) > 100)
    );
    if (bad) return alert(`Invalid marks for ${bad.name}. Enter 0–100.`);
    setSaved(true);
    alert('Marks saved. Result calculation will use these marks.');
  };

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">RESULTS & MARKS</p>
          <h1>Results</h1>
          <p>
            {role === 'Subject Teacher'
              ? 'Enter marks only for your assigned class and subject.'
              : 'Review examination marks and calculated results.'}
          </p>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="student-form">
          <div className="form-group">
            <label>Choose Exam *</label>
            <select value={exam} onChange={(e) => setExam(e.target.value)}>
              {demoExams.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Choose Class *</label>
            <select
              value={classKey}
              onChange={(e) => setClassKey(e.target.value)}
            >
              {classOptions.map((key) => {
                const [c, sec, stream] = key.split('-');
                return (
                  <option key={key} value={key}>
                    Class {c}-{sec}
                    {stream ? ` — ${stream}` : ''}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Subject *</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {Array.from(
                new Set(
                  assignments
                    .filter(
                      (a) =>
                        `${a.className}-${a.section}-${a.stream || ''}` ===
                        classKey
                    )
                    .map((a) => a.subject)
                )
              ).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {selectedAssignment && (
              <small>Assigned subject verified from teacher assignment.</small>
            )}
          </div>
        </div>
      </div>
      <div className="dashboard-card" style={{ marginTop: 20 }}>
        <div className="card-heading">
          <div>
            <h2>
              {exam} — Class {classKey.replaceAll('-', '-')}
            </h2>
            <p>
              Subject: <strong>{subject}</strong> · Total Marks:{' '}
              <strong>100</strong>
            </p>
          </div>
        </div>
        <div className="student-table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Roll</th>
                <th>Student</th>
                <th>Total</th>
                <th>Obtained</th>
                <th>Percentage</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                const value = Number(marks[student.id] || 0);
                const pct = value;
                const grade =
                  pct >= 90
                    ? 'A+'
                    : pct >= 75
                    ? 'A'
                    : pct >= 60
                    ? 'B'
                    : pct >= 45
                    ? 'C'
                    : pct >= 33
                    ? 'D'
                    : 'F';
                return (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{student.name}</strong>
                    </td>
                    <td>100</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={marks[student.id] ?? ''}
                        onChange={(e) => {
                          setSaved(false);
                          setMarks((old) => ({
                            ...old,
                            [student.id]: e.target.value,
                          }));
                        }}
                        placeholder="Marks"
                        style={{ width: 100 }}
                      />
                    </td>
                    <td>{marks[student.id] ? `${pct}%` : '—'}</td>
                    <td>{marks[student.id] ? grade : '—'}</td>
                    <td>
                      {marks[student.id]
                        ? pct >= 33
                          ? 'Pass'
                          : 'Fail'
                        : 'Pending'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {students.length === 0 && (
          <div className="empty-state">
            No students found for this class/stream.
          </div>
        )}
        <div className="form-actions" style={{ marginTop: 20 }}>
          <button type="button" className="primary-button" onClick={saveMarks}>
            SAVE MARKS & GENERATE RESULT
          </button>
          {saved && (
            <span
              style={{ alignSelf: 'center', color: '#1f7a55', fontWeight: 700 }}
            >
              Saved for demo
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function NoticesPage({ role }: { role: Role }) {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Parent–Teacher Meeting',
      date: '2026-10-12',
      audience: 'All Parents & Students',
      status: 'Published',
    },
    {
      id: 2,
      title: 'Half Yearly Examination Schedule',
      date: '2026-09-20',
      audience: 'Students & Teachers',
      status: 'Published',
    },
  ]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [audience, setAudience] = useState('All');
  const canCreate = role === 'School Admin' || role === 'Super Admin';
  const publish = () => {
    if (!title.trim() || !date)
      return alert('Please enter notice title and date.');
    setNotices((items) => [
      {
        id: Date.now(),
        title: title.trim(),
        date,
        audience,
        status: 'Published',
      },
      ...items,
    ]);
    setTitle('');
    setDate('');
  };
  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">COMMUNICATION</p>
          <h1>Notices</h1>
          <p>School notices and announcements in one place.</p>
        </div>
      </div>
      {canCreate && (
        <div className="dashboard-card">
          <div className="student-form">
            <div className="form-group">
              <label>Notice Title *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notice title"
              />
            </div>
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              >
                <option>All</option>
                <option>Students</option>
                <option>Parents</option>
                <option>Teachers</option>
              </select>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="primary-button"
                onClick={publish}
              >
                PUBLISH NOTICE
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="dashboard-card" style={{ marginTop: 20 }}>
        <div className="student-table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Notice</th>
                <th>Date</th>
                <th>Audience</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice.id}>
                  <td>
                    <strong>{notice.title}</strong>
                  </td>
                  <td>{notice.date}</td>
                  <td>{notice.audience}</td>
                  <td>{notice.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AcademicHistoryPage({ role }: { role: Role }) {
  const rows =
    role === 'Student'
      ? [
          {
            session: '2025–2026',
            className: '10-A',
            exam: 'Annual Exam',
            percentage: '78%',
            result: 'Pass',
          },
          {
            session: '2024–2025',
            className: '9-A',
            exam: 'Annual Exam',
            percentage: '74%',
            result: 'Pass',
          },
        ]
      : [
          {
            session: '2026–2027',
            className: '3-A',
            exam: 'Unit Test 1',
            percentage: '82%',
            result: 'Pass',
          },
          {
            session: '2026–2027',
            className: '6-A',
            exam: 'Unit Test 1',
            percentage: '76%',
            result: 'Pass',
          },
        ];
  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACADEMIC RECORD</p>
          <h1>Academic History</h1>
          <p>Past examination and academic performance records.</p>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="student-table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Academic Session</th>
                <th>Class</th>
                <th>Exam</th>
                <th>Percentage</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.session}-${row.className}-${row.exam}`}>
                  <td>{row.session}</td>
                  <td>{row.className}</td>
                  <td>{row.exam}</td>
                  <td>
                    <strong>{row.percentage}</strong>
                  </td>
                  <td>{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="placeholder-page">
      <p className="eyebrow">SHIKSHA ONE MODULE</p>

      <h1>{title}</h1>

      <p>This module will be developed in the next step.</p>

      <div className="dashboard-card">
        <h2>Coming Soon</h2>

        <p>This feature is planned for your school management system.</p>
      </div>
    </div>
  );
}

function FeesPage({ role }: { role: Role }) {
  const [fees, setFees] = useState([
    {
      id: 1,
      student: 'Rohan Singh',
      className: '3-A',
      total: 18000,
      paid: 12000,
    },
    {
      id: 2,
      student: 'Priya Singh',
      className: '3-A',
      total: 18000,
      paid: 18000,
    },
    {
      id: 3,
      student: 'Aditya Singh',
      className: '11-A',
      total: 24000,
      paid: 15000,
    },
  ]);
  const [selected, setSelected] = useState('');
  const [amount, setAmount] = useState('');
  const canEdit = role === 'School Admin' || role === 'Account';
  const collect = () => {
    if (!canEdit) return;
    const n = Number(amount);
    if (!selected || !n || n < 0)
      return alert('Select student and enter valid amount.');
    setFees((items) =>
      items.map((x) =>
        x.id === Number(selected)
          ? { ...x, paid: Math.min(x.total, x.paid + n) }
          : x
      )
    );
    setAmount('');
    alert('Fee entry saved.');
  };
  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACCOUNT SECTION</p>
          <h1>Fees</h1>
          <p>Track student fees, paid amount and pending amount.</p>
        </div>
      </div>
      {canEdit && (
        <div className="dashboard-card">
          <div className="student-form">
            <div className="form-group">
              <label>Student</label>
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value="">Select student</option>
                {fees.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.student} — Class {x.className}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Collection Amount</label>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="form-actions">
              <button
                className="primary-button"
                type="button"
                onClick={collect}
              >
                SAVE COLLECTION
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="dashboard-card" style={{ marginTop: 20 }}>
        <div className="student-table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Pending</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((x) => {
                const pending = x.total - x.paid;
                return (
                  <tr key={x.id}>
                    <td>
                      <strong>{x.student}</strong>
                    </td>
                    <td>{x.className}</td>
                    <td>₹{x.total.toLocaleString()}</td>
                    <td>₹{x.paid.toLocaleString()}</td>
                    <td>₹{pending.toLocaleString()}</td>
                    <td>{pending === 0 ? 'Paid' : 'Pending'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DocumentsPage({ role }: { role: Role }) {
  const [docs, setDocs] = useState([
    {
      id: 1,
      student: 'Rohan Singh',
      type: 'Transfer Certificate',
      status: 'Ready',
    },
    {
      id: 2,
      student: 'Priya Singh',
      type: 'Student Record',
      status: 'Available',
    },
  ]);
  const canCreate = role === 'School Admin';
  const addTC = () => {
    setDocs((items) => [
      {
        id: Date.now(),
        student: 'Selected Student',
        type: 'Transfer Certificate',
        status: 'Draft',
      },
      ...items,
    ]);
    alert(
      'TC record created. Final document generation will be connected to backend.'
    );
  };
  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">DOCUMENTS</p>
          <h1>TC & Documents</h1>
          <p>Maintain student documents and transfer certificate records.</p>
        </div>
      </div>
      {canCreate && (
        <div className="dashboard-card">
          <div className="form-actions">
            <button type="button" className="primary-button" onClick={addTC}>
              + CREATE TC RECORD
            </button>
          </div>
        </div>
      )}
      <div className="dashboard-card" style={{ marginTop: 20 }}>
        <div className="student-table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Document</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((x) => (
                <tr key={x.id}>
                  <td>
                    <strong>{x.student}</strong>
                  </td>
                  <td>{x.type}</td>
                  <td>{x.status}</td>
                  <td>
                    <button
                      className="secondary-button"
                      type="button"
                      onClick={() => alert(`${x.type} — ${x.student}`)}
                    >
                      VIEW
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ReportsPage() {
  const reports = [
    ['Student Report', 'Student strength, class and admission summary'],
    ['Attendance Report', 'Daily and monthly attendance summary'],
    ['Result Report', 'Exam-wise marks, percentage and pass/fail'],
    ['Fee Report', 'Paid, pending and collection summary'],
  ];
  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">REPORTS</p>
          <h1>Reports</h1>
          <p>School-level reports ready for database integration.</p>
        </div>
      </div>
      <div className="dashboard-grid">
        {reports.map(([title, desc]) => (
          <div className="dashboard-card" key={title}>
            <div className="card-heading">
              <h2>{title}</h2>
            </div>
            <p>{desc}</p>
            <button
              className="secondary-button"
              type="button"
              onClick={() =>
                alert(
                  `${title} report will be generated from live database data.`
                )
              }
            >
              GENERATE REPORT
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuperAdminPage() {
  const [schools, setSchools] = useState([
    {
      id: 1,
      name: 'Demo Public School',
      code: 'SPS001',
      admin: 'School Admin',
      status: 'Active',
      students: 5,
    },
  ]);
  const toggle = (id: number) =>
    setSchools((items) =>
      items.map((x) =>
        x.id === id
          ? { ...x, status: x.status === 'Active' ? 'Inactive' : 'Active' }
          : x
      )
    );
  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">SYSTEM ADMINISTRATION</p>
          <h1>Schools</h1>
          <p>Manage schools and their administrative accounts.</p>
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Schools</span>
          <strong>{schools.length}</strong>
          <small>Registered schools</small>
        </div>
        <div className="stat-card">
          <span>Active</span>
          <strong>{schools.filter((x) => x.status === 'Active').length}</strong>
          <small>Active schools</small>
        </div>
        <div className="stat-card">
          <span>Students</span>
          <strong>{schools.reduce((a, x) => a + x.students, 0)}</strong>
          <small>Across schools</small>
        </div>
        <div className="stat-card">
          <span>Admins</span>
          <strong>{schools.length}</strong>
          <small>School administrators</small>
        </div>
      </div>
      <div className="dashboard-card" style={{ marginTop: 20 }}>
        <div className="student-table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>School</th>
                <th>Code</th>
                <th>Admin</th>
                <th>Students</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((x) => (
                <tr key={x.id}>
                  <td>
                    <strong>{x.name}</strong>
                  </td>
                  <td>{x.code}</td>
                  <td>{x.admin}</td>
                  <td>{x.students}</td>
                  <td>{x.status}</td>
                  <td>
                    <button
                      className="secondary-button"
                      type="button"
                      onClick={() => toggle(x.id)}
                    >
                      {x.status === 'Active' ? 'DEACTIVATE' : 'ACTIVATE'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Demo User');
  const [role, setRole] = useState<Role>('School Admin');
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [schoolProfile, setSchoolProfile] =
    useState<SchoolProfile>(defaultSchoolProfile);

  useEffect(() => {
    const savedLogin = localStorage.getItem('shiksha_logged_in');
    const savedName = localStorage.getItem('shiksha_user_name');
    const savedRole = localStorage.getItem('shiksha_user_role');
    const savedSchoolProfile = localStorage.getItem('shiksha_school_profile');

    if (savedLogin === 'true') {
      setIsLoggedIn(true);
    }

    if (savedName) {
      setUserName(savedName);
    }

    const validRoles: Role[] = [
      'Super Admin',
      'School Admin',
      'Class Teacher',
      'Subject Teacher',
      'Account',
      'Student',
    ];

    if (savedRole && validRoles.includes(savedRole as Role)) {
      setRole(savedRole as Role);
    }

    if (savedSchoolProfile) {
      try {
        const parsedProfile = JSON.parse(savedSchoolProfile) as SchoolProfile;

        setSchoolProfile({
          ...defaultSchoolProfile,
          ...parsedProfile,
          classesAvailable: Array.isArray(parsedProfile.classesAvailable)
            ? parsedProfile.classesAvailable
            : defaultSchoolProfile.classesAvailable,
        });
      } catch {
        setSchoolProfile(defaultSchoolProfile);
      }
    }
  }, []);

  const handleLogin = (loggedInUserName: string, loggedInRole: Role) => {
    setIsLoggedIn(true);
    setUserName(loggedInUserName);
    setRole(loggedInRole);
    setActiveMenu('Dashboard');

    localStorage.setItem('shiksha_logged_in', 'true');
    localStorage.setItem('shiksha_user_name', loggedInUserName);
    localStorage.setItem('shiksha_user_role', loggedInRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveMenu('Dashboard');

    localStorage.removeItem('shiksha_logged_in');
    localStorage.removeItem('shiksha_user_name');
    localStorage.removeItem('shiksha_user_role');
  };

  const handleSchoolProfileSave = (updatedProfile: SchoolProfile) => {
    setSchoolProfile(updatedProfile);
    localStorage.setItem(
      'shiksha_school_profile',
      JSON.stringify(updatedProfile)
    );
  };

  const roleMenus: Record<Role, string[]> = {
    'Super Admin': ['Dashboard', 'Schools', 'Reports', 'Notices'],
    'School Admin': [
      'Dashboard',
      'School Profile',
      'Students',
      'Teachers',
      'Classes & Subjects',
      'Exams',
      'Attendance',
      'Results',
      'Fees',
      'TC & Documents',
      'Reports',
      'Notices',
      'Academic History',
    ],
    'Class Teacher': [
      'Dashboard',
      'Students',
      'Attendance',
      'Results',
      'Notices',
      'Academic History',
    ],
    'Subject Teacher': ['Dashboard', 'Results', 'Notices'],
    Account: ['Dashboard', 'Fees', 'TC & Documents', 'Reports', 'Notices'],
    Student: [
      'Dashboard',
      'Attendance',
      'Results',
      'Fees',
      'TC & Documents',
      'Reports',
      'Notices',
      'Academic History',
    ],
  };

  const allowedMenus = roleMenus[role];
  const visibleMenuItems = menuItems.filter((item) =>
    allowedMenus.includes(item.label)
  );

  const renderPage = () => {
    if (activeMenu === 'Dashboard') {
      if (role === 'Student') {
        return <StudentDashboard userName={userName} />;
      }
      if (role === 'Class Teacher' || role === 'Subject Teacher') {
        return (
          <TeacherDashboard
            userName={userName}
            role={role}
            schoolProfile={schoolProfile}
          />
        );
      }
      if (role === 'Account') {
        return (
          <AccountDashboard userName={userName} schoolProfile={schoolProfile} />
        );
      }
      return <DashboardHome profile={schoolProfile} />;
    }

    if (activeMenu === 'Schools' && role === 'Super Admin') {
      return <SuperAdminPage />;
    }

    if (
      activeMenu === 'Reports' &&
      (role === 'School Admin' || role === 'Account' || role === 'Super Admin')
    ) {
      return <ReportsPage />;
    }

    if (
      activeMenu === 'Fees' &&
      (role === 'School Admin' || role === 'Account' || role === 'Student')
    ) {
      return <FeesPage role={role} />;
    }

    if (
      activeMenu === 'TC & Documents' &&
      (role === 'School Admin' || role === 'Account' || role === 'Student')
    ) {
      return <DocumentsPage role={role} />;
    }

    if (activeMenu === 'School Profile' && role === 'School Admin') {
      return (
        <SchoolProfilePage
          profile={schoolProfile}
          onSave={handleSchoolProfileSave}
        />
      );
    }

    if (activeMenu === 'Teachers' && role === 'School Admin') {
      return <TeachersPage schoolProfile={schoolProfile} />;
    }

    if (
      activeMenu === 'Students' &&
      (role === 'School Admin' || role === 'Class Teacher')
    ) {
      return <StudentsPage />;
    }

    if (activeMenu === 'Classes & Subjects' && role === 'School Admin') {
      return <ClassesSubjectsPage />;
    }

    if (activeMenu === 'Exams' && role === 'School Admin') {
      return <ExamsPage />;
    }

    if (
      activeMenu === 'Attendance' &&
      (role === 'School Admin' || role === 'Class Teacher')
    ) {
      return <AttendancePage role={role} />;
    }

    if (
      activeMenu === 'Results' &&
      (role === 'School Admin' ||
        role === 'Class Teacher' ||
        role === 'Subject Teacher' ||
        role === 'Student')
    ) {
      return <ResultsPage role={role} userName={userName} />;
    }

    if (activeMenu === 'Notices' && allowedMenus.includes('Notices')) {
      return <NoticesPage role={role} />;
    }

    if (
      activeMenu === 'Academic History' &&
      allowedMenus.includes('Academic History')
    ) {
      return <AcademicHistoryPage role={role} />;
    }

    if (allowedMenus.includes(activeMenu)) {
      return <PlaceholderPage title={activeMenu} />;
    }

    return <PlaceholderPage title="Access Restricted" />;
  };

  if (!isLoggedIn) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-symbol">S</span>

          <div>
            <h2>SHIKSHA</h2>
            <span>ONE</span>
          </div>
        </div>

        <div className="school-mini-card">
          <div className="school-icon">🏫</div>

          {schoolProfile.logo ? (
            <img
              src={schoolProfile.logo}
              alt="School logo"
              style={{
                width: 42,
                height: 42,
                objectFit: 'contain',
                borderRadius: 8,
                background: '#fff',
                marginBottom: 6,
              }}
            />
          ) : null}

          <strong>{schoolProfile.schoolName}</strong>
          <span>{schoolProfile.schoolCode}</span>
        </div>

        <nav className="sidebar-nav">
          {visibleMenuItems.map((item) => (
            <button
              type="button"
              key={item.label}
              className={`nav-item ${
                activeMenu === item.label ? 'active' : ''
              }`}
              onClick={() => setActiveMenu(item.label)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <p>SHIKSHA ONE</p>
          <small>School Management System</small>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <span className="topbar-title">
              {activeMenu === 'Dashboard' ? 'School Dashboard' : activeMenu}
            </span>
          </div>

          <div className="topbar-right">
            <div className="profile">
              <div className="profile-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>

              <div className="profile-details">
                <strong>{role}</strong>
                <span>{userName}</span>
              </div>
            </div>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        <section className="page-content">{renderPage()}</section>

        <footer className="footer">
          <p>© 2026 SHIKSHA ONE. School Management System.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
