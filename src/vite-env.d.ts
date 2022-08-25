/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENTID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
