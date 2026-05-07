const CheckAdmin = () => {
    const data = sessionStorage.getItem("isAdmin")
    return data
}

export default CheckAdmin