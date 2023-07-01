import {useEffect, useRef, useState} from 'react';
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
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [dataSources, setDataSources] = useState([]);

    let {register, handleSubmit, formState: {errors}, setValue} = useForm();

    const handleCleanArticle = () => {
        cleanArticle()
    }

    useEffect(() => {
        http.get("http://localhost:8000/api/data_sources", {})
            .then(response => {
                setDataSources(response.data.data)
            })
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
            data_source: data.data_source,
            resource: data.resource,
        }).then(resource => {
            //console.log(resource)
        }).catch(error => console.log("error", error))
    }

    const handleDataSourceChange =  data => {
        setValue("data_source", data)

        if(data?.value){
            http.post("http://localhost:8000/api/sources", {
                data_source: data.value
            }).then(response => {
                setSources(response.data.data)
            }).catch(error => console.log("error", error))

            http.post("http://localhost:8000/api/categories", {
                data_source: data.value
            }).then(response => {
                setCategories(response.data.data)
            }).catch(error => console.log("error", error))
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="search-box">
                    <Row>
                        <Col className="col-lg-2 col-md-2 col-sm-6">
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
                        <Col className="col-lg-2 col-md-2  col-sm-6">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Published At</Form.Label>
                                <DatePicker className="form-control"
                                            autoComplete="off"
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
                        <Col className="col-lg-2 col-md-2  col-sm-6">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Data Source</Form.Label>
                                <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        name="data_source"
                                        isClearable={true}
                                        {...register("data_source")}
                                        isInvalid={errors.data_source}
                                        components={animatedComponents}
                                        onChange={data => handleDataSourceChange(data)}
                                    // isMulti
                                        options={dataSources}/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.data_source && errors.data_source.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col className="col-lg-3 col-md-3  col-sm-6">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Resource</Form.Label>
                                <Select closeMenuOnSelect={false}
                                        name="resource"
                                        {...register("resource")}
                                        isInvalid={errors.resource}
                                        components={animatedComponents}
                                        onChange={data => setValue("resource", data)}
                                        isMulti
                                        isClearable={true}
                                        options={sources}/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.resource && errors.resource.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col className="col-lg-3 col-md-3  col-sm-6">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Category</Form.Label>
                                <Select closeMenuOnSelect={false}
                                        name="category"
                                        {...register("category")}
                                        isInvalid={errors.category}
                                        components={animatedComponents}
                                        onChange={data => setValue("category", data)}
                                        isMulti
                                        options={categories}/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.category && errors.category.message}
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