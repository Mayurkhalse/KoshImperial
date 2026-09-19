import React from 'react';

export const UserTable = ({ users = [] }) => {
  return (
    <div className="bg-white border border-driftwood-300 overflow-x-auto shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-driftwood-300 text-evergreen-700 text-xs uppercase tracking-wider font-semibold border-b border-driftwood-300">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-driftwood-300 text-charcoal">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-milkglass-300 transition-colors">
              <td className="p-4 font-serif text-sm font-medium text-evergreen-700">
                {user.name}
              </td>
              <td className="p-4 text-xs font-mono">{user.email}</td>
              <td className="p-4">
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 ${
                    user.role === 'admin'
                      ? 'bg-mahogany-base text-milkglass-base'
                      : 'bg-driftwood-300 text-evergreen-700'
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="p-4 text-xs text-muted-brown">{user.phone || '—'}</td>
              <td className="p-4 text-xs text-muted-brown">
                {new Date(user.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
