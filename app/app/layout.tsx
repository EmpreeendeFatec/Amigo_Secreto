export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {

const supabase = await createClient();
const {data, error} = await supabase.auth.getSession();

if (error || !data?.user) {
    redirect('/auth/login')
}
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}