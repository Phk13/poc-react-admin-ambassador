import React from 'react'
import { Navigate } from 'react-router-dom'

export const RedirectToUsers = () => <Navigate to={'/users'} />;
