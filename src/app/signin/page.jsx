import Signin from '@/components/page/Signin';
import { cookies } from 'next/headers';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';

export default async function SigninPage() {
  const session = await auth();

  if (session?.user) {
    return redirect('/dashboard', 'replace');
  }

  const cookieStore = cookies();
  const csrfToken = cookieStore.get('next-auth.csrf-token');

  return <Signin csrfToken={csrfToken?.value} />;
}
