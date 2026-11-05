import type { ComponentType } from 'react';
import { Base64DecoderWorkspace } from './workspaces/Base64DecoderWorkspace';
import { Base64EncoderWorkspace } from './workspaces/Base64EncoderWorkspace';
import { CaseConverterWorkspace } from './workspaces/CaseConverterWorkspace';
import { JsonFormatterWorkspace } from './workspaces/JsonFormatterWorkspace';
import { UrlDecoderWorkspace } from './workspaces/UrlDecoderWorkspace';
import { UrlEncoderWorkspace } from './workspaces/UrlEncoderWorkspace';
import { WordCounterWorkspace } from './workspaces/WordCounterWorkspace';

// Slug → workspace component. Only slugs listed here resolve to a live tool;
// everything else falls back to `ComingSoonShell` (set by the page).
export const WORKSPACES: Record<string, ComponentType> = {
  'json-formatter': JsonFormatterWorkspace,
  'base64-encoder': Base64EncoderWorkspace,
  'base64-decoder': Base64DecoderWorkspace,
  'url-encoder': UrlEncoderWorkspace,
  'url-decoder': UrlDecoderWorkspace,
  'word-counter': WordCounterWorkspace,
  'case-converter': CaseConverterWorkspace,
};
