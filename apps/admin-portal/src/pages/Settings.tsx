import { Save, Eye, EyeOff, Bell, Lock, Globe, User } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'My Store',
    storeEmail: 'support@mystore.com',
    storePhone: '+1 (555) 123-4567',
    taxRate: '10',
    currency: 'USD',
    language: 'English',
    timezone: 'EST',
    emailNotifications: true,
    orderNotifications: true,
    inventoryAlerts: true,
    marketingEmails: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your store configuration and preferences</p>
      </div>

      {/* Store Information */}
      <Section title="Store Information" icon={<Globe size={20} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Store Name">
            <input
              type="text"
              name="storeName"
              value={settings.storeName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          <FormGroup label="Store Email">
            <input
              type="email"
              name="storeEmail"
              value={settings.storeEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          <FormGroup label="Store Phone">
            <input
              type="tel"
              name="storePhone"
              value={settings.storePhone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
        </div>
      </Section>

      {/* Regional Settings */}
      <Section title="Regional Settings" icon={<Globe size={20} />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormGroup label="Currency">
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>CAD</option>
            </select>
          </FormGroup>
          <FormGroup label="Language">
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </FormGroup>
          <FormGroup label="Timezone">
            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>EST</option>
              <option>CST</option>
              <option>MST</option>
              <option>PST</option>
            </select>
          </FormGroup>
        </div>
        <FormGroup label="Tax Rate (%)" className="mt-4">
          <input
            type="number"
            name="taxRate"
            value={settings.taxRate}
            onChange={handleChange}
            step="0.01"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormGroup>
      </Section>

      {/* Notification Settings */}
      <Section title="Notifications" icon={<Bell size={20} />}>
        <div className="space-y-4">
          <CheckboxField
            label="Email Notifications"
            description="Receive email updates for store activity"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
          />
          <CheckboxField
            label="Order Notifications"
            description="Get notified when new orders arrive"
            name="orderNotifications"
            checked={settings.orderNotifications}
            onChange={handleChange}
          />
          <CheckboxField
            label="Inventory Alerts"
            description="Receive alerts when stock levels are low"
            name="inventoryAlerts"
            checked={settings.inventoryAlerts}
            onChange={handleChange}
          />
          <CheckboxField
            label="Marketing Emails"
            description="Receive promotional content and updates"
            name="marketingEmails"
            checked={settings.marketingEmails}
            onChange={handleChange}
          />
        </div>
      </Section>

      {/* Security */}
      <Section title="Security" icon={<Lock size={20} />}>
        <div className="space-y-4">
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">API Key</p>
                <p className="text-sm text-slate-400">Use this key for API integrations</p>
              </div>
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition"
              >
                {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="mt-3 p-3 bg-slate-900 rounded border border-slate-700 font-mono text-sm break-all">
              {showApiKey ? 'sk_live_51234567890abcdefghijklmnop' : '••••••••••••••••••••••••••••'}
            </div>
          </div>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition">
            Regenerate API Key
          </button>
        </div>
      </Section>

      {/* Account */}
      <Section title="Account" icon={<User size={20} />}>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
            <div>
              <p className="text-white font-medium">Password</p>
              <p className="text-sm text-slate-400">Last changed 3 months ago</p>
            </div>
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition">
              Change
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
            <div>
              <p className="text-white font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-slate-400">Not enabled</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
              Enable
            </button>
          </div>
        </div>
      </Section>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: any) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-blue-400">{icon}</div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FormGroup({ label, children, className }: any) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      {children}
    </div>
  );
}

function CheckboxField({ label, description, name, checked, onChange }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700 rounded-lg hover:bg-slate-800/50 transition cursor-pointer">
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
    </div>
  );
}
