'use client';

import React from 'react';
import { Box, Typography, Avatar, Divider } from '@mui/material';

export default function AgentGeneralInfos({ transcription, onClose }) {
  // console.log('transcription',transcription)
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 2, backgroundColor: '#1976d2', color: 'white' }}>
        <Typography variant="h6">Call Transcription</Typography>
      </Box>

      {/* Chat Area */}
      <Box sx={{
        flex: 1,
        p: 2,
        overflowY: 'auto',
        backgroundColor: '#f9f9f9',
      }}>
        {/* {transcription.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              flexDirection: msg.sender === 'Agent' ? 'row' : 'row-reverse',
              mb: 2,
            }}
          >
            <Avatar sx={{ bgcolor: msg.sender === 'Agent' ? '#1976d2' : '#9c27b0', ml: 1, mr: 1 }}>
              {msg.sender.charAt(0)}
            </Avatar>
            <Box sx={{ maxWidth: '70%' }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: msg.sender === 'Agent' ? '#e3f2fd' : '#f3e5f5',
              }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {msg.sender}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {msg.message}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                {msg.timestamp}
              </Typography>
            </Box>
          </Box>
        ))} */}
        {transcription.map((msg,index) => (
          <Box
            key={msg.index} // Use msg.id for unique key
            sx={{
              display: 'flex',
              flexDirection: msg.role === 'agent' ? 'row' : 'row-reverse',
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: msg.role === 'agent' ? '#1976d2' : '#9c27b0',
                ml: msg.role === 'agent' ? 1 : 0,
                mr: msg.role === 'agent' ? 0 : 1,
              }}
            >
              {msg.role.charAt(0)}
            </Avatar>
            <Box sx={{ maxWidth: '70%' }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: msg.role === 'agent' ? '#e3f2fd' : '#f3e5f5',
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {msg.role}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {msg.content}
                </Typography>
              </Box>
              {msg.timestamp && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                  {msg.timestamp}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Optional Footer */}
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={onClose}
        >
          Close
        </Typography>
      </Box>
    </Box>
  );
}
