import { Link } from "react-router-dom";
import "./Card.css"

export function Sales() {
    return (
    <div className="col">
        <div className="card card-default">
        <i className="fa-brands fa-salesforce card-img-top logo"></i>
        <div className="card-body">
            <h5 className="card-title"> Sales Department</h5>
            <Link to={"sales"} className="btn btn-primary">Login</Link>
        </div>
        </div>
    </div>
    );
};

export function Purchase() {
    return (
    <div className="col">
        <div className="card card-default">
        <i class="fa-solid fa-cart-shopping card-img-top logo"></i>
        <div className="card-body">
            <h5 className="card-title"> Purchase Department</h5>
            <Link to={"purchase"} className="btn btn-primary">Login</Link>
        </div>
        </div>
    </div>
    );
};

export function Order() {
    return (
    <div className="col">
        <div className="card card-default">
        <i class="fa-solid fa-truck card-img-top logo"></i>
        <div className="card-body">
            <h5 className="card-title"> Order Management</h5>
            <Link to={"order"} className="btn btn-primary">Login</Link>
        </div>
        </div>
    </div>
    );
};

export function Inventory() {
    return (
    <div className="col">
        <div className="card card-default">
        <i class="fa-solid fa-boxes-stacked card-img-top logo"></i>
        <div className="card-body">
            <h5 className="card-title"> Inventory Management</h5>
            <Link to={"inventory"} className="btn btn-primary">Login</Link>
        </div>
        </div>
    </div>
    );
};

export function HR() {
    return (
    <div className="col">
        <div className="card card-default">
        <i class="fa-solid fa-people-group card-img-top logo"></i>
        <div className="card-body">
            <h5 className="card-title"> HR Department</h5>
            <Link to={"hr"} className="btn btn-primary">Login</Link>
        </div>
        </div>
    </div>
    );
};

export function Finance() {
    return (
    <div className="col">
        <div className="card card-default">
        <i class="fa-solid fa-arrow-trend-up card-img-top logo"></i>
        <div className="card-body">
            <h5 className="card-title"> Finance Department</h5>
            <Link to={"finance"} className="btn btn-primary">Login</Link>
        </div>
        </div>
    </div>
    );
};

export function CRM() {
    return (
    <div className="col">
        <div className="card card-default">
        <i class="fa-regular fa-handshake card-img-top logo"></i>
        <div className="card-body">
            <h5 className="card-title"> Customer Relations</h5>
            <Link to={"crm"} className="btn btn-primary">Login</Link>
        </div>
        </div>
    </div>
    );
};