import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type StaffLogin = {
  id: string;
  user_id: number;
  username: string;
  join_time: string;
  leave_time: string | null;
};

type BanLog = {
  id: string;
  user_id: number;
  username: string;
  reason: string;
  banned_by: string;
  timestamp: string;
  duration: number;
};

export default function Dashboard() {
  const [staffLogins, setStaffLogins] = useState<StaffLogin[]>([]);
  const [banLogs, setBanLogs] = useState<BanLog[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: staffData, error: staffError } = await supabase.from('staff_logins').select('*');
      const { data: banData, error: banError } = await supabase.from('ban_logs').select('*');

      if (staffError) {
        console.error('Error loading staff logins:', staffError.message);
      } else {
        setStaffLogins(staffData || []);
      }

      if (banError) {
        console.error('Error loading ban logs:', banError.message);
      } else {
        setBanLogs(banData || []);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Staff Logins</h1>
      <table border={1} cellPadding={5} style={{ marginBottom: 40, width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Join Time</th>
            <th>Leave Time</th>
          </tr>
        </thead>
        <tbody>
          {staffLogins.map((login) => (
            <tr key={login.id}>
              <td>{login.username}</td>
              <td>{new Date(login.join_time).toLocaleString()}</td>
              <td>{login.leave_time ? new Date(login.leave_time).toLocaleString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Ban Logs</h1>
      <table border={1} cellPadding={5} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Reason</th>
            <th>Banned By</th>
            <th>Timestamp</th>
            <th>Duration (min)</th>
          </tr>
        </thead>
        <tbody>
          {banLogs.map((ban) => (
            <tr key={ban.id}>
              <td>{ban.username}</td>
              <td>{ban.reason}</td>
              <td>{ban.banned_by}</td>
              <td>{new Date(ban.timestamp).toLocaleString()}</td>
              <td>{ban.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
