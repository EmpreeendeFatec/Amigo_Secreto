import { redirect } from 'next/navigation'

export default async function AppPage() {
  redirect('/apps/grupos/novo');
  
}