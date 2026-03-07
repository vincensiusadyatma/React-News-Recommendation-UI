const CheckAuth = () => {
    const data = sessionStorage.getItem("isLogin")
    return data
}

export default CheckAuth