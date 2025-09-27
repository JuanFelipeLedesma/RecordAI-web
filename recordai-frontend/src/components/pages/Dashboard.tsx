import React from 'react';
import { colors, getCategoryColor } from '../../App';

interface DashboardProps {
  onDaySelect: (date: Date) => void;
}

export function Dashboard({ onDaySelect }: DashboardProps) {
  const today = new Date();
  const dayNumber = today.getDate();

  return (
    <div style={{ 
      padding: '2rem 8rem', 
      background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
      minHeight: '100vh' 
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Left Column */}
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 700, 
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.work} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem' 
            }}>
              Hola, Juan!
            </h1>
            <div style={{ 
              fontSize: '4rem', 
              fontWeight: 200, 
              color: colors.textMuted, 
              marginBottom: '2rem',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}>
              {dayNumber}
            </div>
          </div>
          
          {/* Enhanced Calendar */}
          <div style={{
            background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '2rem',
            width: '100%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '2rem' 
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                color: colors.textPrimary 
              }}>
                {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
            </div>
            
            {/* Calendar Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} style={{
                  padding: '0.75rem',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: colors.textSecondary
                }}>
                  {day}
                </div>
              ))}
              
              {/* Enhanced calendar days */}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - 6 + 1;
                const isToday = dayNum === dayNumber;
                const hasReminder = [5, 12, 18, 25, 28].includes(dayNum);
                
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (dayNum > 0 && dayNum <= 31) {
                        const selectedDate = new Date(today.getFullYear(), today.getMonth(), dayNum);
                        onDaySelect(selectedDate);
                      }
                    }}
                    style={{
                      width: '3rem',
                      height: '3rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      border: 'none',
                      background: isToday 
                        ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                        : hasReminder
                        ? `${colors.success}20`
                        : 'transparent',
                      color: isToday ? '#ffffff' : dayNum > 0 && dayNum <= 31 ? colors.textPrimary : colors.textMuted,
                      cursor: dayNum > 0 && dayNum <= 31 ? 'pointer' : 'default',
                      fontSize: '1rem',
                      fontWeight: isToday ? 600 : 400,
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (dayNum > 0 && dayNum <= 31 && !isToday) {
                        e.currentTarget.style.backgroundColor = colors.hoverBackground;
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (dayNum > 0 && dayNum <= 31 && !isToday) {
                        e.currentTarget.style.backgroundColor = hasReminder ? `${colors.success}20` : 'transparent';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    {dayNum > 0 && dayNum <= 31 ? dayNum : ''}
                    {hasReminder && !isToday && (
                      <div style={{
                        position: 'absolute',
                        bottom: '4px',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: colors.success
                      }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Enhanced Reminders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: 600, 
              color: colors.textPrimary, 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🕒 Next reminders
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { title: 'Study Calculus', time: '14:30', category: '🏠 Home' },
                { title: 'Buy fruit', time: '16:00', category: '🛒 Shopping' },
                { title: 'Finish book', time: '19:00', category: '🧩 Other' }
              ].map((reminder, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: `linear-gradient(135deg, ${colors.hoverBackground} 0%, #ffffff 100%)`,
                  borderRadius: '12px',
                  border: `1px solid ${getCategoryColor(reminder.category)}30`,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div>
                    <div style={{ 
                      fontWeight: 600, 
                      color: colors.textPrimary, 
                      fontSize: '0.875rem',
                      marginBottom: '0.25rem'
                    }}>
                      {reminder.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: colors.textSecondary }}>
                      {reminder.time}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: getCategoryColor(reminder.category),
                    borderRadius: '20px',
                    color: '#ffffff',
                    fontWeight: 500,
                    boxShadow: `0 2px 4px ${getCategoryColor(reminder.category)}30`
                  }}>
                    {reminder.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: 600, 
              color: colors.textPrimary, 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              📅 Next week
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { title: 'Team meeting', time: 'Aug 28', category: '💼 Work' },
                { title: 'Birthday party', time: 'Aug 30', category: '🎂 Birthday' }
              ].map((reminder, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: `linear-gradient(135deg, ${colors.hoverBackground} 0%, #ffffff 100%)`,
                  borderRadius: '12px',
                  border: `1px solid ${getCategoryColor(reminder.category)}30`,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div>
                    <div style={{ 
                      fontWeight: 600, 
                      color: colors.textPrimary, 
                      fontSize: '0.875rem',
                      marginBottom: '0.25rem'
                    }}>
                      {reminder.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: colors.textSecondary }}>
                      {reminder.time}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: getCategoryColor(reminder.category),
                    borderRadius: '20px',
                    color: '#ffffff',
                    fontWeight: 500,
                    boxShadow: `0 2px 4px ${getCategoryColor(reminder.category)}30`
                  }}>
                    {reminder.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}