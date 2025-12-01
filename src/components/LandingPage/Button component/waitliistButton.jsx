import './waitlistButton.css'; 
import { useState } from 'react';

const WaitlistButton = () => {
  // Backend API URL - reads from environment variable
  const BACKEND_URL = 'http://localhost:5000';

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  // Validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!email.trim()) {
      showToast('Please enter your email address', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Send request to backend proxy
      const response = await fetch(`${BACKEND_URL}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await response.json();

      if (data.success) {
        showToast('Successfully added to waitlist! 🎉', 'success');
        setEmail('');
      } else {
        showToast(data.message || 'Failed to add email. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('Unable to connect to server. Please try again later.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className='waitlist-container'>


      <input
        type="email"
        style={{
          ...styles.input,
          ...(isLoading ? styles.inputDisabled : {})
        }}
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      <button
        onClick={handleSubmit}
        style={{
          ...styles.button,
          ...(isLoading ? styles.buttonDisabled : {})
        }}
        disabled={isLoading}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(12, 20, 16, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {isLoading ? (
          <span style={styles.spinner}></span>
        ) : (
          'Join Waitlist'
        )}
      </button>


      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          ...styles.toast,
          ...(toast.type === 'success' ? styles.toastSuccess : styles.toastError)
        }}>
          <div style={styles.toastContent}>
            <span style={styles.toastIcon}>
              {toast.type === 'success' ? '✓' : '✕'}
            </span>
            <span style={styles.toastMessage}>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {

  // description: {
  //   fontSize: '16px',
  //   color: '#718096',
  //   textAlign: 'center',
  //   marginBottom: '32px',
  //   lineHeight: '1.6',
  // },
  // inputGroup: {
  //   display: 'flex',
  //   gap: '12px',
  //   flexDirection: 'column',
  //   marginBottom: '16px',
  // },
  // input: {
  //   flex: '1',
  //   padding: '14px 16px',
  //   fontSize: '16px',
  //   border: '2px solid #e2e8f0',
  //   borderRadius: '8px',
  //   outline: 'none',
  //   transition: 'all 0.2s',
  //   width: '100%',
  // },
  inputDisabled: {
    backgroundColor: '#f7fafc',
    cursor: 'not-allowed',
  },
  // button: {
  //   padding: '14px 32px',
  //   fontSize: '16px',
  //   fontWeight: '600',
  //   color: 'white',
  //   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  //   border: 'none',
  //   borderRadius: '8px',
  //   cursor: 'pointer',
  //   transition: 'all 0.2s',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   minHeight: '50px',
  // },
  buttonDisabled: {
    opacity: '0.7',
    cursor: 'not-allowed',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
  },
  toast: {
    position: 'fixed',
    top: '24px',
    right: '24px',
    padding: '16px 24px',
    borderRadius: '8px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    animation: 'slideIn 1s ease-out',
    zIndex: 1000,
    maxWidth: '400px',
  },
  toastSuccess: {
    backgroundColor: '#48bb78',
    color: 'white',
  },
  toastError: {
    backgroundColor: '#f56565',
    color: 'white',
  },
  toastContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  toastIcon: {
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
  },
  toastMessage: {
    fontSize: '15px',
    fontWeight: '500',
  },
};

// Add CSS animation for spinner
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(styleSheet);

export default WaitlistButton;