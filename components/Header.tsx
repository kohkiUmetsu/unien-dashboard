'use client';

import { Button, Navbar } from 'flowbite-react';

const Header = () => {
  return (
    <div className="px-24 bg-white">
        <Navbar fluid rounded>
            <Navbar.Brand href="https://flowbite-react.com">
            {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Unien ダッシュボード</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
            <Button className='font-bold'>サークル登録</Button>
            <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
            <Navbar.Link href="#" className='font-bold' active>
                ホーム
            </Navbar.Link>
            <Navbar.Link href="#" className='font-bold'>サイトについて</Navbar.Link>
            <Navbar.Link href="#" className='font-bold'>問い合わせ</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    </div>
  )
}

export default Header