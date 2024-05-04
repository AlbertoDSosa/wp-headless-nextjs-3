import Header from '@/components/layout/DashHeader';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user) {
    return redirect('/signin');
  }

  return (
    <div className="min-h-full">
      <Header session={session} />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
