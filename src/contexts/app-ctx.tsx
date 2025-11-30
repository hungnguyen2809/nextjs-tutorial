'use client';

import { clientSessionToken } from '@/apis/http';
import React, { useState } from 'react';

export const AppProvider = (props: { children: React.ReactNode; token?: string }) => {
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = props.token || '';
    }
    // việc đổi từ useEffect sang useState: mục đích để component mount chắc chắn chạy đoạn này trước xong rồi mới đến logic trong useEffect
  });

  return <React.Fragment>{props.children}</React.Fragment>;
};
