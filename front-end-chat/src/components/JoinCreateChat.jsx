import React from 'react';

const JoinCreateChat = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f7ecea' // Light background color
    }}>
      <div style={{
        border: '1px solid #d1d5db', // Light gray border
        padding: '2rem',
        width: '100%',
        maxWidth: '28rem',
        borderRadius: '0.375rem',
        backgroundColor: '#ffffff', // White background for the card
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 600, 
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#1f2937' // Dark gray text
        }}>
          Join Room / Create Room ..
        </h1>

        {/* Name div */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{
            display: 'block',
            fontWeight: 500,
            marginBottom: '0.5rem',
            color: '#374151' // Gray text
          }}>
            Your Name
          </label>
          <input 
            type="text" 
            id="name"
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              outline: 'none',
              fontSize: '1rem',
              ':focus': {
                borderColor: '#3b82f6', // Blue focus
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)'
              }
            }}
          />
        </div>

        {/* Room ID div */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="roomId" style={{
            display: 'block',
            fontWeight: 500,
            marginBottom: '0.5rem',
            color: '#374151'
          }}>
            Room ID / New Room ID
          </label>
          <input 
            type="text" 
            id="roomId"
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              outline: 'none',
              fontSize: '1rem',
              ':focus': {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)'
              }
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6', // Blue
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: 500,
            cursor: 'pointer',
            ':hover': {
              backgroundColor: '#2563eb' // Darker blue on hover
            }
          }}>
            Join Room
          </button>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#f97316', // Orange
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: 500,
            cursor: 'pointer',
            ':hover': {
              backgroundColor: '#ea580c' // Darker orange on hover
            }
          }}>
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;