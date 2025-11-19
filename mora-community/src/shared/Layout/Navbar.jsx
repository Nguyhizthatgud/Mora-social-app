import React from 'react'
import { Avatar, Button, Dropdown, Modal } from "antd"
import { AppstoreOutlined, UnlockOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Loginpage from '../Layout/components/Loginpage.jsx'
import logo from "../../assets/logo/Logo.svg"
const Navbar = () => {
    const navigate = useNavigate();
    return (
        <section className="header-section container flex items-center justify-between h-16 min-w-lg">
            <div className="logo flex items-center gap-3">

                <img
                    src={logo}
                    alt="MovieApp Logo"
                    className="h-6 md:h-10 w-auto cursor-pointer"
                />
                {/* {user ? (
                  <FormProvider methods={methods}>
                      <div className="logo-text flex items-center relative" ref={dropdownRef}>
                          <FormTextField
                              name="moviesSearch"
                              placeholder="Gemini giúp bạn tìm film bạn muốn..."
                              prefix={loading ? <LoadingOutlined /> : <SiGooglegemini />}
                              allowClear={false}
                              onChange={handleSearchChange}
                              className="!w-120 !rounded-full !bg-gray-800 !text-white !placeholder-gray-400"
                              ref={inputRef}
                          />
                          {shouldShowDropdown(movieSearchValue, searchResults?.length > 0 || loading || error) && (
                              <SearchDropdownItem
                                  loading={}
                                  error={}
                                  searchResults={searchResults}
                                  movieSearchValue={movieSearchValue}
                                  selectedIndex={selectedIndex}
                                  onMovieSelect={handleMovieSelect}
                                  onViewAllResults={() => handleViewAllResults(movieSearchValue)}
                                  searchingService={searchingService}
                              />
                          )}
                      </div>
                  </FormProvider>
              ) : (<div></div>)} */}
            </div>
            {/* <Modal
                title={
                    <div className="text-center text-2xl font-semibold ">
                        <div>
                            <UnlockOutlined />
                        </div>
                        Đăng nhập đi anh? Tên gì đó...

                    </div>
                }
                closable={false}
                open={modal}
                onCancel={handleModalClose}
                footer={null}
                style={{ width: "100%" }}
            >
                <Loginpage
                    closeModal={closeModal}
                />
            </Modal > */}
            {/* <div className="flex items-center gap-4">
                {user ? (
                    <Dropdown
                        menu={{ items: menuItems }}
                        placement="bottom"
                        trigger={['hover', 'click']}
                    >
                        <Avatar
                            className="!bg-white cursor-pointer"
                            onClick={dropdown.toggle}
                            style={{
                                color: '#f56a00',
                                backgroundColor: '#fde3cf',
                                fontWeight: "600",
                                fontSize: "16px",
                                border: "1px solid #f56a00"
                            }}
                        >
                            {user.username.charAt(0)}
                        </Avatar>
                    </Dropdown>
                ) : (
                    <Dropdown
                        menu={{ items: groupMenuItems }}
                        placement="bottom"
                        trigger={['hover', 'click']}
                    >
                        <Button type="link">
                            <AppstoreOutlined className="text-2xl !text-white pointer" />
                        </Button>
                    </Dropdown>
                )}
            </div> */}
        </section>
    )
}

export default Navbar
