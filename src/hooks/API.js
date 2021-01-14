import { useEffect, useContext } from 'react';
import { EmployeeContext } from "../components/EmployeeContext"
import axios from "axios"

export function useGet(url) {
    const { employees, setEmployees, displayedEmployees, setDisplayedEmployees } = useContext(EmployeeContext)

    // gets employees from an api, stores them in both employees, and displayed employees. Only occurs once when component is mounted.
    useEffect(() => {
        async function getEmployees() {
            try {
                const response = await axios.get(url)
                // using employees to store a copy of all the employees that will not be manipulated
                setEmployees(response.data.results)
                // using displayed employees to be a manipulated version of the employees that will be displayed for sorting and filtering.
                setDisplayedEmployees(response.data.results)
            }
            catch (error) {
                console.log("error ocurred getting info from the API: ", error)
            }
        }
        getEmployees()
    }, [])

    // used to decide which sort function to trigger
    function sortFunc(sort) {
        switch (sort) {
            case "firstName":
                sortByFirstName()
                break
            case "lastName":
                sortByLastName()
                break
            case "userName":
                sortByUserName()
                break
            case "gender":
                sortByGender()
                break
            case "email":
                sortByEmail()
                break
            case "age":
                sortByAge()
                break
            default:
                console.log("sort does not match any cases")
        }
    }

    // sorts the employees based on first name.
    function sortByFirstName() {
        employees.sort(function (a, b) {
            if (a.name.first < b.name.first) {
                return -1;
            } else {
                return 1;
            }
        })
        setDisplayedEmployees([...employees])
    }

    // sorts the employees based on last name.
    function sortByLastName() {
        employees.sort(function (a, b) {
            if (a.name.last < b.name.last) {
                return -1;
            } else {
                return 1;
            }
        })
        setDisplayedEmployees([...employees])
    }
    //username
    function sortByUserName() {
        employees.sort(function (a, b) {
            if (a.login.username < b.login.username) {
                return -1;
            } else {
                return 1;
            }
        })
        setDisplayedEmployees([...employees])
    }
    //gender
    function sortByGender() {
        employees.sort(function (a, b) {
            if (a.gender < b.gender) {
                return -1;
            } else {
                return 1;
            }
        })
        setDisplayedEmployees([...employees])
    }
    //email
    function sortByEmail() {
        employees.sort(function (a, b) {
            if (a.email < b.email) {
                return -1;
            } else {
                return 1;
            }
        })
        setDisplayedEmployees([...employees])
    }
    //age
    function sortByAge() {
        employees.sort(function (a, b) {
            return (a.dob.age - b.dob.age)
        })
        setDisplayedEmployees([...employees])
    }

    return { displayedEmployees, sortFunc }
}
