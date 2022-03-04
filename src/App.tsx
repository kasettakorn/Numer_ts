import './App.css';
import { Layout, Menu } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { Routes, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Bisection, FalsePosition, NewtonRaphson, Onepoint, Secant } from './calculation/Root of equation';
import { Cramer, Gauss, Jordan } from './calculation/Linear Algaebra';

const { Header, Content, Footer } = Layout;
export default function App() {
    return (
        <>
            <Layout className='layout'>
                <Header>
                    <Menu theme='dark' style={{ backgroundColor: "" }} mode='horizontal'>
                        <Menu.SubMenu key="unit1" title={<span>Root of Equation <CaretDownFilled /></span>}>
                            <Menu.Item key={1}><Link to='/bisection'>Bisection</Link></Menu.Item>
                            <Menu.Item key={2}><Link to='/falseposition'>False Position</Link></Menu.Item>
                            <Menu.Item key={3}><Link to='/onepoint'>One-Point iteration</Link></Menu.Item>
                            <Menu.Item key={4}><Link to='/newton-raphson'>Newton Raphson</Link></Menu.Item>
                            <Menu.Item key={5}><Link to="/secant">Secant</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="unit2" title={<span>Linear Algebra <CaretDownFilled /></span>}>
                            <Menu.Item key={6}><Link to='/cramer'>Cramer's Rule</Link></Menu.Item>
                            <Menu.Item key={7}><Link to='/gauss'>Gauss's Elimination</Link></Menu.Item>
                            <Menu.Item key={8}><Link to='/jordan'>Gauss Jordan</Link></Menu.Item>
                            <Menu.Item key={9}>LU Decomposition</Menu.Item>
                            <Menu.Item key={10}>Cholesky Decomposition</Menu.Item>
                            <Menu.Item key={11}>Jacobi Iteration</Menu.Item>
                            <Menu.Item key={12}>Gauss-Seidel Iteration</Menu.Item>
                            <Menu.Item key={13}>Conjugate Gradient</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="unit3" title={<span>Interpolation <CaretDownFilled /></span>}>
                            <Menu.Item key={14}>Newton's Divided difference</Menu.Item>
                            <Menu.Item key={15}>Lagrange</Menu.Item>
                            <Menu.Item key={16}>Spline</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="unit4" title={<span>Regression <CaretDownFilled /></span>}>
                            <Menu.Item key={17}>Linear</Menu.Item>
                            <Menu.Item key={18}>Polynomial</Menu.Item>
                            <Menu.Item key={19}>Multiple Linear</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="unit5" title={<span>Integration <CaretDownFilled /></span>}>
                            <Menu.Item key={20}>Trapzoidal's rule</Menu.Item>
                            <Menu.Item key={21}>Composite Trapzoidal's rule</Menu.Item>
                            <Menu.Item key={22}>Simpson's Rule</Menu.Item>
                            <Menu.Item key={23}>Composite Simpson's Rule</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Header>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: "90vh",
                        }}
                    >
                        <Routes>
                            <Route path="/bisection" element={<Bisection />} />
                            <Route path="/falseposition" element={<FalsePosition />} />
                            <Route path="/onepoint" element={<Onepoint />} />
                            <Route path="/newton-raphson" element={<NewtonRaphson />} />
                            <Route path="/secant" element={<Secant />} />
                            <Route path="/cramer" element={<Cramer />} />
                            <Route path="/gauss" element={<Gauss />} />
                            <Route path="/jordan" element={<Jordan />} />
                        </Routes>

                    </Content>
                </Layout>
                {/* <Footer style={{ backgroundColor: "#001529", minHeight: 120 }}>
                    <p style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
                        ©2022 All Right Reserved<br />
                        <p style={{ fontSize: "22px", verticalAlign: "text-bottom" }}><FacebookFilled style={{ fontSize: "30px" }} /><a target="_blank" rel="noopener noreferrer" href="http://www.facebook.com/kornkung.h" style={{ color: "white", textDecoration: "none" }}> Ronnakorn   Hompoa</a></p>

                        <p style={{ fontSize: "22px", verticalAlign: "text-bottom" }}><BookFilled style={{ fontSize: "30px" }} /><a target="_blank" rel="noopener noreferrer" href="http://www.facebook.com/kornkung.h" style={{ color: "white", textDecoration: "none" }}> Department of Computer and Information Science - King Mongkut's University of Technology North Bangkok</a></p>

                    </p>


                </Footer> */}
            </Layout>
        </>

    )
}

