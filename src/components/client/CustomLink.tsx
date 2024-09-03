'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

type CustomLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function CustomLink({ href, className, children, ...props }: CustomLinkProps) {
    const pathname = usePathname();
    console.log(pathname);
  return (
    <Link href={href} className={`${className} ${pathname === href ? 'text-primary bg-muted' : ''}`} {...props}>
      {children}
    </Link>
  );
}
