import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../api/settings";
import type { createUserSettingsInput, UpdateUserSettingsInput } from "finance-common";

const SettingsPage = () => {
  const [settings, setSettings] = useState<UpdateUserSettingsInput>({
    currency: "",
    timezone: "",
    language: "",
  });
  const [userId, setUserId] = useState(""); // <-- NEW
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings()
      .then((data: createUserSettingsInput) => {
        const { currency, timezone, language, userId } = data;
        setSettings({ currency, timezone, language });
        setUserId(userId); // <-- SAVE userId
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof UpdateUserSettingsInput, value: string) => {
    const updated = { ...settings, [field]: value };
    setSettings(updated);
    if (userId) {
      updateSettings(userId, updated).catch((err) =>
        console.error("Failed to update settings", err)
      );
    }
  };

  if (loading) return <div className="p-6">Loading settings...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Settings</h1>

      <div className="space-y-4">
        <label className="block">
          Currency:
          <input
            className="ml-2 border p-1 rounded"
            value={settings.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
          />
        </label>

        <label className="block">
          Timezone:
          <input
            className="ml-2 border p-1 rounded"
            value={settings.timezone}
            onChange={(e) => handleChange("timezone", e.target.value)}
          />
        </label>

        <label className="block">
          Language:
          <input
            className="ml-2 border p-1 rounded"
            value={settings.language}
            onChange={(e) => handleChange("language", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default SettingsPage;
