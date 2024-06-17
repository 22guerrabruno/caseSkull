import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { ArrowRightIcon, LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
  return (
    <nav className=' sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold items-center'>
            <>
              <img
                src='/skull.png'
                alt='logo'
                className='h-10 w-10 rounded-full mr-1'
              />
              case <span className=' text-red-500 rounded-md'>S</span>
              <span className=' text-orange-500 rounded-md'>k</span>
              <span className=' text-yellow-500 rounded-md'>u</span>
              <span className=' text-blue-500 rounded-md'>l</span>
              <span className=' text-viole rounded-md'>l</span>
            </>
          </Link>
          <div className='hfull flex items-center space-x-4'>
            {user ? (
              <>
                <Link
                  href='/api/auth/logout'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Sing Out
                  <LogOut className='w-5 h-5 ml-1.5' />
                </Link>
                {isAdmin && (
                  <Link
                    href='/api/auth/logout'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}>
                    Dashboard
                    <LayoutDashboard className='w-5 h-5 ml-1.5' />
                  </Link>
                )}
                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className:
                      ' hidden sm:flex items-center gap-1 bg-rainbow bg-opacity-75 text-white font-bold',
                  })}>
                  Create Case
                  <ArrowRightIcon className='w-5 h-5 ml-1.5' />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/api/auth/register'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Sing Up
                </Link>
                <Link
                  href='/api/auth/login'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Sing In
                  <LogIn className='w-5 h-5 ml-1.5' />
                </Link>
                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className:
                      ' hidden sm:flex items-center gap-1 bg-rainbow bg-opacity-75 text-white font-bold',
                  })}>
                  Create Case
                  <ArrowRightIcon className='w-5 h-5 ml-1.5' />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
