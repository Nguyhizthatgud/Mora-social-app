import React from 'react'
import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo/logo.svg'

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <footer className="w-full py-10 border-t border-gray-200/30 text-gray-600">
            <div className="container mx-auto flex flex-col gap-8">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    {/* Brand */}
                    <div className="flex items-start gap-4">
                        <img src={logo} alt="Mora Community" className="h-10 w-auto" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Mora Community</h3>
                            <p className="text-sm text-gray-500 max-w-sm">
                                A Threads-style social app built for portfolio/demo purposes.
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    <nav aria-label="Footer" className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Product</p>
                            <ul className="mt-3 space-y-2 text-sm">
                                <li><Link to="#" className="hover:text-gray-900 transition">Features</Link></li>
                                <li><Link to="#" className="hover:text-gray-900 transition">Changelog</Link></li>
                                <li><Link to="#" className="hover:text-gray-900 transition">Roadmap</Link></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Company</p>
                            <ul className="mt-3 space-y-2 text-sm">
                                <li><Link to="#" className="hover:text-gray-900 transition">About</Link></li>
                                <li><Link to="#" className="hover:text-gray-900 transition">Contact</Link></li>
                                <li><Link to="#" className="hover:text-gray-900 transition">Careers</Link></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Legal</p>
                            <ul className="mt-3 space-y-2 text-sm">
                                <li><Link to="#" className="hover:text-gray-900 transition">Terms</Link></li>
                                <li><Link to="#" className="hover:text-gray-900 transition">Privacy</Link></li>
                                <li><Link to="#" className="hover:text-gray-900 transition">Cookies</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-gray-200/30 pt-6 md:flex-row md:items-center">
                    <p className="text-xs text-gray-500">
                        © {year} Mora Community. For portfolio/demo purposes only. Not affiliated with Threads or Meta.
                    </p>
                    <div className="flex items-center gap-4 text-gray-500">
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="GitHub"
                            className="hover:text-gray-900 transition"
                            title="GitHub"
                        >
                            <GithubOutlined className="text-xl" />
                        </a>
                        <a
                            href="https://x.com/"
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="Twitter / X"
                            className="hover:text-gray-900 transition"
                            title="Twitter / X"
                        >
                            <TwitterOutlined className="text-xl" />
                        </a>
                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="LinkedIn"
                            className="hover:text-gray-900 transition"
                            title="LinkedIn"
                        >
                            <LinkedinOutlined className="text-xl" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

