import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import { UserTable } from '../components/users/UserTable.jsx';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get('/admin/users')
      .then((res) => {
        setUsers(res.data?.data?.users || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-mahogany-base font-semibold">
          DIRECTORY & CRM
        </span>
        <h1 className="font-serif text-3xl text-evergreen-700 font-normal mt-1">
          Registered Patrons
        </h1>
      </div>

      {isLoading ? (
        <p className="text-xs uppercase tracking-widest text-muted-brown">Loading directory...</p>
      ) : (
        <UserTable users={users} />
      )}
    </div>
  );
};
