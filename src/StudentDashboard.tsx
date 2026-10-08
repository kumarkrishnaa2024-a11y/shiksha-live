import React from 'react';

const StudentDashboard: React.FC = () => {
  return (
    <div className="student-dashboard">
      <div className="student-header">
        <div>
          <h1>Welcome, Student 👋</h1>
          <p>Your academic dashboard</p>
        </div>

        <div className="student-profile">
          <div className="profile-avatar">S</div>
          <div>
            <strong>Demo Student</strong>
            <p>Class 6 • Roll No. 01</p>
          </div>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <span className="card-icon">💰</span>
          <h3>Fees Status</h3>
          <p className="success-text">Paid</p>
          <small>Fees payment status</small>
        </div>

        <div className="dashboard-card">
          <span className="card-icon">📅</span>
          <h3>Attendance</h3>
          <p className="number-text">85%</p>
          <small>Overall attendance</small>
        </div>

        <div className="dashboard-card">
          <span className="card-icon">🎓</span>
          <h3>Results</h3>
          <p className="number-text">View</p>
          <small>Exam marks and results</small>
        </div>

        <div className="dashboard-card">
          <span className="card-icon">📊</span>
          <h3>Academic Overview</h3>
          <p className="number-text">Good</p>
          <small>Learning progress</small>
        </div>
      </div>

      <div className="student-section">
        <h2>Student Information</h2>

        <div className="student-info-grid">
          <p>
            <strong>Name:</strong> Demo Student
          </p>
          <p>
            <strong>Class:</strong> 6
          </p>
          <p>
            <strong>Roll Number:</strong> 01
          </p>
          <p>
            <strong>School:</strong> Shiksha Demo School
          </p>
        </div>
      </div>

      <div className="student-section">
        <h2>Recent Academic Activity</h2>

        <div className="activity-item">
          <span>📚</span>
          <div>
            <strong>Academic Overview</strong>
            <p>Subject marks and learning progress will appear here.</p>
          </div>
        </div>

        <div className="activity-item">
          <span>📝</span>
          <div>
            <strong>Exam Results</strong>
            <p>Your examination results will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
