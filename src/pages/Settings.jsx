import PageShell from "../components/PageShell";
import { useClinicalState } from "../hooks/useClinicalState";

export default function Settings() {
  const { settings, setSettings } = useClinicalState();

  const update = (patch) => setSettings((current) => ({ ...current, ...patch }));

  return (
    <PageShell eyebrow="Settings" title="Product Configuration" description="Appearance, privacy, accessibility, and migration notes for the React deployment.">
      <section className="panel settings-grid">
        <label className="switch-row">
          <span>Theme</span>
          <select value={settings.theme} onChange={(event) => update({ theme: event.target.value })}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <label className="switch-row">
          <span>Language</span>
          <select value={settings.language} onChange={(event) => update({ language: event.target.value })}>
            <option>English</option>
            <option>Español</option>
            <option>Français</option>
          </select>
        </label>
        <label className="switch-row">
          <span>High contrast mode</span>
          <input type="checkbox" checked={settings.highContrast} onChange={(event) => update({ highContrast: event.target.checked })} />
        </label>
        <label className="switch-row">
          <span>Enable animations</span>
          <input type="checkbox" checked={settings.animations} onChange={(event) => update({ animations: event.target.checked })} />
        </label>
        <label className="switch-row">
          <span>Local auto-save</span>
          <input type="checkbox" checked={settings.autoSave} onChange={(event) => update({ autoSave: event.target.checked })} />
        </label>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Migration map</p>
            <h2>Streamlit to React equivalents</h2>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <tbody>
              <tr>
                <td>st.sidebar + tabs</td>
                <td>Persistent patient panel with grouped React form sections</td>
              </tr>
              <tr>
                <td>st.slider / st.selectbox / st.checkbox</td>
                <td>Controlled range, select, and checkbox inputs</td>
              </tr>
              <tr>
                <td>Plotly gauge, radar, heatmap, timeline</td>
                <td>Recharts gauge-style UI, radar, bar, area, and line charts</td>
              </tr>
              <tr>
                <td>Session state</td>
                <td>React context with localStorage persistence</td>
              </tr>
              <tr>
                <td>Download buttons and report text area</td>
                <td>Report studio with text export and print support</td>
              </tr>
              <tr>
                <td>PyCaret model</td>
                <td>Transparent browser scoring engine; production ML endpoint hook recommended</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </PageShell>
  );
}
