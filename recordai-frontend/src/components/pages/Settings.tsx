import React, { useState } from 'react';
import { Bell, Mail, Shield, Info, History, ExternalLink, Calendar, Chrome } from 'lucide-react';
import { AccordionRow } from '../AccordionRow';
import { SettingsSubpanel } from '../SettingsSubpanel';
import { SegmentedControl } from '../SegmentedControl';
import { TimeRangePicker } from '../TimeRangePicker';
import { ConfirmationModal } from '../ConfirmationModal';
import { HistoryTable } from '../HistoryTable';

interface SettingsProps {
  onShowToast: (message: string) => void;
}

export function Settings({ onShowToast }: SettingsProps) {
  const [openSection, setOpenSection] = useState<string>('notifications');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearHistoryModal, setShowClearHistoryModal] = useState(false);
  
  // Notifications settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bypassDnd, setBypassDnd] = useState(false);
  const [quietHoursFrom, setQuietHoursFrom] = useState('22:00');
  const [quietHoursTo, setQuietHoursTo] = useState('08:00');
  const [previewContent, setPreviewContent] = useState('Full');
  const [defaultSnooze, setDefaultSnooze] = useState('5');
  const [channels, setChannels] = useState({
    desktop: true,
    email: false,
    mobile: true
  });

  // Email settings
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [dailyDigest, setDailyDigest] = useState(false);
  const [emailConfirmations, setEmailConfirmations] = useState(true);

  // Privacy settings
  const [saveRecordings, setSaveRecordings] = useState(false);
  const [retentionPeriod, setRetentionPeriod] = useState('30 days');
  const [connectedServices, setConnectedServices] = useState({
    googleCalendar: true,
    outlook: false,
    icloud: true
  });

  // History settings
  const [historySearch, setHistorySearch] = useState('');
  const [historyDateFrom, setHistoryDateFrom] = useState('');
  const [historyDateTo, setHistoryDateTo] = useState('');
  const [historyPage, setHistoryPage] = useState(1);

  const mockHistoryData = [
    { id: '1', action: 'Created' as const, reminderTitle: 'Team meeting', dateTime: 'Dec 8, 2024 2:30 PM' },
    { id: '2', action: 'Edited' as const, reminderTitle: 'Grocery shopping', dateTime: 'Dec 7, 2024 10:15 AM' },
    { id: '3', action: 'Deleted' as const, reminderTitle: 'Call dentist', dateTime: 'Dec 6, 2024 3:45 PM' },
  ];

  const handleSectionToggle = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? '' : sectionId);
  };

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings`);
    setOpenSection('');
    onShowToast('Settings saved');
  };

  const handleCancel = () => {
    setOpenSection('');
  };

  const handleTestEmail = () => {
    console.log('Sending test email');
    onShowToast('Test email sent');
  };

  const handleExportData = () => {
    console.log('Exporting data');
    onShowToast('Export requested');
  };

  const handleDeleteAccount = () => {
    console.log('Account deleted');
    setShowDeleteModal(false);
    onShowToast('Account deleted');
  };

  const handleExportHistory = () => {
    console.log('Exporting history');
    onShowToast('History exported');
  };

  const handleClearHistory = () => {
    console.log('History cleared');
    setShowClearHistoryModal(false);
    onShowToast('History cleared');
  };

  const sections = [
    {
      id: 'notifications',
      icon: <Bell className="w-5 h-5" />,
      title: 'Notifications'
    },
    {
      id: 'email',
      icon: <Mail className="w-5 h-5" />,
      title: 'Email'
    },
    {
      id: 'privacy',
      icon: <Shield className="w-5 h-5" />,
      title: 'Privacy'
    },
    {
      id: 'about',
      icon: <Info className="w-5 h-5" />,
      title: 'About'
    },
    {
      id: 'history',
      icon: <History className="w-5 h-5" />,
      title: 'History'
    }
  ];

  return (
    <div className="px-32 py-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {sections.map((section) => (
            <div key={section.id}>
              <AccordionRow
                id={section.id}
                icon={section.icon}
                title={section.title}
                isOpen={openSection === section.id}
                onClick={handleSectionToggle}
              />
              
              {/* Notifications Panel */}
              {section.id === 'notifications' && (
                <SettingsSubpanel
                  id="notifications"
                  isOpen={openSection === 'notifications'}
                  onSave={() => handleSave('notifications')}
                  onCancel={handleCancel}
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <label htmlFor="notifications-enabled" className="text-sm text-black">
                        Enable notifications
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="notifications-enabled"
                          type="checkbox"
                          checked={notificationsEnabled}
                          onChange={(e) => setNotificationsEnabled(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-switch-background peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="sound-enabled" className="text-sm text-black">
                        Allow sound
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="sound-enabled"
                          type="checkbox"
                          checked={soundEnabled}
                          onChange={(e) => setSoundEnabled(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-switch-background peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="bypass-dnd" className="text-sm text-black">
                        Bypass "Do Not Disturb" for critical reminders
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="bypass-dnd"
                          type="checkbox"
                          checked={bypassDnd}
                          onChange={(e) => setBypassDnd(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-switch-background peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>

                    <TimeRangePicker
                      label="Quiet hours"
                      fromTime={quietHoursFrom}
                      toTime={quietHoursTo}
                      onFromTimeChange={setQuietHoursFrom}
                      onToTimeChange={setQuietHoursTo}
                    />

                    <div className="space-y-3">
                      <label className="block text-sm text-black">Reminder preview content</label>
                      <SegmentedControl
                        options={['Full', 'Title only', 'Hidden']}
                        value={previewContent}
                        onChange={setPreviewContent}
                        name="preview-content"
                      />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="default-snooze" className="block text-sm text-black">
                        Default snooze (minutes)
                      </label>
                      <input
                        id="default-snooze"
                        type="number"
                        value={defaultSnooze}
                        onChange={(e) => setDefaultSnooze(e.target.value)}
                        className="w-24 px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-black bg-input-background min-h-[40px]"
                        min="1"
                        max="60"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm text-black">Channels</label>
                      <div className="space-y-2">
                        {Object.entries(channels).map(([key, checked]) => (
                          <div key={key} className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => setChannels(prev => ({
                                  ...prev,
                                  [key]: e.target.checked
                                }))}
                                className="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black focus:ring-2"
                              />
                            </label>
                            <span className="text-sm text-gray-700 capitalize">
                              {key === 'desktop' ? 'Desktop push' : key === 'email' ? 'Email' : 'Mobile push'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500">Changes apply to new reminders.</p>
                  </div>
                </SettingsSubpanel>
              )}

              {/* Email Panel */}
              {section.id === 'email' && (
                <SettingsSubpanel
                  id="email"
                  isOpen={openSection === 'email'}
                  onSave={() => handleSave('email')}
                  onCancel={handleCancel}
                >
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label htmlFor="primary-email" className="block text-sm text-black">
                        Primary email
                      </label>
                      <input
                        id="primary-email"
                        type="email"
                        value={primaryEmail}
                        onChange={(e) => setPrimaryEmail(e.target.value)}
                        placeholder="name@email.com"
                        className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-black bg-input-background min-h-[40px]"
                      />
                      <p className="text-sm text-gray-500">We never share your email.</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="daily-digest" className="text-sm text-black">
                        Send daily digest of reminders
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="daily-digest"
                          type="checkbox"
                          checked={dailyDigest}
                          onChange={(e) => setDailyDigest(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-switch-background peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="email-confirmations" className="text-sm text-black">
                        Send confirmations for new reminders
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="email-confirmations"
                          type="checkbox"
                          checked={emailConfirmations}
                          onChange={(e) => setEmailConfirmations(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-switch-background peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>

                    <button
                      onClick={handleTestEmail}
                      className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-black rounded min-h-[40px]"
                    >
                      Send test email
                    </button>
                  </div>
                </SettingsSubpanel>
              )}

              {/* Privacy Panel */}
              {section.id === 'privacy' && (
                <SettingsSubpanel
                  id="privacy"
                  isOpen={openSection === 'privacy'}
                  onSave={() => handleSave('privacy')}
                  onCancel={handleCancel}
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <label htmlFor="save-recordings" className="text-sm text-black">
                        Save voice recordings for transcription improvements
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="save-recordings"
                          type="checkbox"
                          checked={saveRecordings}
                          onChange={(e) => setSaveRecordings(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-switch-background peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="retention-period" className="block text-sm text-black">
                        Retention period
                      </label>
                      <select
                        id="retention-period"
                        value={retentionPeriod}
                        onChange={(e) => setRetentionPeriod(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-black bg-input-background min-h-[40px]"
                      >
                        <option value="30 days">30 days</option>
                        <option value="90 days">90 days</option>
                        <option value="1 year">1 year</option>
                        <option value="Keep until deleted">Keep until deleted</option>
                      </select>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleExportData}
                        className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-black rounded min-h-[40px]"
                      >
                        Export my data (CSV/ZIP)
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 rounded min-h-[40px]"
                      >
                        Delete account…
                      </button>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm text-black">Connected services</label>
                      <div className="space-y-2">
                        {Object.entries(connectedServices).map(([key, connected]) => (
                          <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                            <div className="flex items-center gap-3">
                              {key === 'googleCalendar' && <Calendar className="w-4 h-4 text-gray-600" />}
                              {key === 'outlook' && <Mail className="w-4 h-4 text-gray-600" />}
                              {key === 'icloud' && <Chrome className="w-4 h-4 text-gray-600" />}
                              <span className="text-sm text-black">
                                {key === 'googleCalendar' ? 'Google Calendar' : key === 'outlook' ? 'Outlook' : 'iCloud'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {key === 'googleCalendar' ? '(read/write)' : '(read)'}
                              </span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={connected}
                                onChange={(e) => setConnectedServices(prev => ({
                                  ...prev,
                                  [key]: e.target.checked
                                }))}
                                className="sr-only peer"
                              />
                              <div className="relative w-11 h-6 bg-switch-background peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                      <a href="#" className="text-sm text-black hover:underline flex items-center gap-1">
                        Manage permissions
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </SettingsSubpanel>
              )}

              {/* About Panel */}
              {section.id === 'about' && (
                <SettingsSubpanel
                  id="about"
                  isOpen={openSection === 'about'}
                  onSave={() => handleSave('about')}
                  onCancel={handleCancel}
                >
                  <div className="space-y-4">
                    {[
                      { label: 'Version', value: 'v1.0.0' },
                      { label: 'Changelog', value: 'View changelog', isLink: true },
                      { label: 'Documentation', value: 'Open docs', isLink: true },
                      { label: 'Contact support', value: 'support@recordai.com', isLink: true, href: 'mailto:support@recordai.com' },
                      { label: 'Terms & Privacy', value: 'View terms', isLink: true }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2">
                        <span className="text-sm text-black">{item.label}</span>
                        {item.isLink ? (
                          <a 
                            href={item.href || '#'} 
                            className="text-sm text-black hover:underline flex items-center gap-1"
                          >
                            {item.value}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-sm text-gray-600">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </SettingsSubpanel>
              )}

              {/* History Panel */}
              {section.id === 'history' && (
                <SettingsSubpanel
                  id="history"
                  isOpen={openSection === 'history'}
                  onSave={() => handleSave('history')}
                  onCancel={handleCancel}
                >
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={historySearch}
                          onChange={(e) => setHistorySearch(e.target.value)}
                          placeholder="Search history..."
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-black bg-input-background min-h-[40px]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={historyDateFrom}
                          onChange={(e) => setHistoryDateFrom(e.target.value)}
                          className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-black bg-input-background min-h-[40px]"
                        />
                        <span className="flex items-center text-gray-400">–</span>
                        <input
                          type="date"
                          value={historyDateTo}
                          onChange={(e) => setHistoryDateTo(e.target.value)}
                          className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-black bg-input-background min-h-[40px]"
                        />
                      </div>
                    </div>

                    <HistoryTable
                      items={mockHistoryData}
                      currentPage={historyPage}
                      totalPages={3}
                      onPageChange={setHistoryPage}
                    />

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={handleExportHistory}
                        className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-black rounded min-h-[40px]"
                      >
                        Export CSV
                      </button>
                      <button
                        onClick={() => setShowClearHistoryModal(true)}
                        className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 rounded min-h-[40px]"
                      >
                        Clear history…
                      </button>
                    </div>
                  </div>
                </SettingsSubpanel>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete account?"
        message="This action cannot be undone. All your data will be permanently deleted."
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteModal(false)}
      />

      <ConfirmationModal
        isOpen={showClearHistoryModal}
        title="Clear history?"
        message="This will permanently delete all your activity history. This action cannot be undone."
        confirmText="Clear"
        confirmVariant="destructive"
        onConfirm={handleClearHistory}
        onCancel={() => setShowClearHistoryModal(false)}
      />
    </div>
  );
}