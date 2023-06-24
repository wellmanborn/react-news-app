import {useEffect, useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import DatePicker from 'react-datepicker';
import makeAnimated from "react-select/animated";
import {useForm} from "react-hook-form";
import http from './../libs/Http'


const animatedComponents = makeAnimated();

// eslint-disable-next-line react/prop-types
function Search({cleanArticle}) {

    const [startDate, setStartDate] = useState("");

    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'}
    ]

    let {register, handleSubmit, formState: {errors}, setValue} = useForm();

    const handleCleanArticle = () => {
        cleanArticle()
    }

    useEffect(() => {
        http.post("http://localhost:8000/api/search", {
            keyword: "technology",
        })
    }, []);


    const onSubmit = (data) => {
        handleCleanArticle();
        http.post("http://localhost:8000/api/search", {
            keyword: data.keyword,
            published_at: data.published_at,
            category: data.category,
            resource: data.resource,
        }).then(resource => {
            console.log(resource)
        }).catch(error => console.log("error", error))
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="search-box">
                    <Row>
                        <Col className="col-lg-3 col-md-3 col-sm-12">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Keyword</Form.Label>
                                <Form.Control type="text"
                                              defaultValue="technology"
                                              isInvalid={errors.keyword}
                                              aria-label="Search anything ...."
                                              {...register("keyword", {required: true, minLength: 3})}
                                              placeholder="Search anything ...."/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.keyword && errors.keyword.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col className="col-lg-3 col-md-3 col-sm-12">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Published At</Form.Label>
                                <DatePicker className="form-control"
                                            name="published_at"
                                            {...register("published_at")}
                                            onChange={(date) => {
                                                setValue("published_at", date)
                                                setStartDate(date)
                                            }}
                                            selected={startDate}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.published_at && errors.published_at.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col className="col-lg-3 col-md-3 col-sm-12">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Category</Form.Label>
                                <Select closeMenuOnSelect={false}
                                        name="category"
                                        {...register("category")}
                                        isInvalid={errors.category}
                                        components={animatedComponents}
                                        onChange={data => setValue("category", data)}
                                        isMulti
                                        options={options}/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.category && errors.category.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col className="col-lg-3 col-md-3 col-sm-12">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Resource</Form.Label>
                                <Select closeMenuOnSelect={false}
                                        name="resource"
                                        {...register("resource")}
                                        isInvalid={errors.resource}
                                        components={animatedComponents}
                                        onChange={data => setValue("resource", data)}
                                        isMulti
                                        options={options}/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.resource && errors.resource.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
                <Row className="mb-3 justify-content-end">
                    <Col className="offset-10"><Button
                        className="btn btn-danger float-end px-5" type="submit">Search</Button></Col>
                </Row>
            </Form>
        </div>
    );
}

export default Search;