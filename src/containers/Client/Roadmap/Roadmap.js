import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import * as actions from "../../../store/actions";
import './Roadmap.scss';
import SoDo from "../../../assets/SoDo.PNG";
import VIDU from "../../../assets/VIDU.png";
import { getAScholastics } from '../../../services/courseService';
import { withRouter } from 'react-router';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { clamp } from 'lodash';
class Roadmap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scholasticsRedux: [],
            roadmapsRedux: [],
            detailScholastic: {},
            isClicked: false,
            isMouseOver: false,
            hoveredButtonId: null,
            clickedButtonId: null, // Thêm trạng thái để theo dõi button đang được nhấp
            zIndexCounter: 2,
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAScholastics(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailScholastic: res.data
                })
            }
            this.props.fetchRoadmapRedux(id);
            this.props.fetchCourseRedux();

        }

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.roadmap !== this.props.roadmap) {
            this.setState({
                scholasticsRedux: this.props.roadmap,

            });

            let arrRoadmaps = this.props.roadmap;
            let roadmapBySemester = {};
            let totalCredits = 0;
            let totalCourses = 0;

            // Tạo danh sách phần tử theo semester
            arrRoadmaps.forEach((item, index) => {
                // Kiểm tra xem semester đã tồn tại trong đối tượng chưa
                if (!roadmapBySemester[item.semester]) {
                    roadmapBySemester[item.semester] = [];
                }

                // Thêm phần tử vào danh sách của semester
                roadmapBySemester[item.semester].push(item);
            });

            // Tính tổng số tín chỉ và số môn
            Object.keys(roadmapBySemester).forEach((semester) => {
                let semesterTotalCredits = roadmapBySemester[semester].reduce((sum, subItem) => sum + subItem.credit, 0);
                let semesterItemCount = roadmapBySemester[semester].length;

                totalCredits += semesterTotalCredits;
                totalCourses += semesterItemCount;
            });

            // Cập nhật giá trị cho state
            this.setState({
                localTotalCredits: totalCredits,
                localTotalCourses: totalCourses,
            });

        }
        this.drawLines();
    }
    handleClick = () => {
        var toggleButtons = document.querySelectorAll(".toggle-btn");
        var contents = document.querySelectorAll(".tab-content")
        var detailBtns = document.querySelector(".image_course_play")
        if (!this.state.isClicked) {
            // Gắn sự kiện click cho nút button
            function showContent(toggleButton, content) {
                toggleButton.addEventListener("click", function () {
                    // Kiểm tra trạng thái hiện tại của nút
                    if (toggleButton.classList.contains("activeShowContent")) {
                        // Nếu đang active, chuyển sang inactive
                        toggleButton.classList.remove("activeShowContent");
                        toggleButton.classList.add("inactiveShowContent");
                        content.style.display = "none"
                    } else {
                        // Nếu đang inactive, chuyển sang active
                        toggleButton.classList.remove("inactiveShowContent");
                        toggleButton.classList.add("activeShowContent");
                        content.style.display = "block"
                    }
                });
            }
            this.setState({ isClicked: true });
            for (let i = 0; i < toggleButtons.length; i++) {
                showContent(toggleButtons[i], contents[i]);
            }
        }
        var modal = document.getElementById('id01');

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    handleViewDetailCourse = (course) => {
        if (this.props.history) {
            this.props.history.push(`/detail-course/${course.id}`)
        }

    }


    handleMouseOver = (buttonId) => {
        this.setState((prevState) => ({
            hoveredButtonId: buttonId,
        }));
    };

    handleMouseOut = () => {
        this.setState({
            hoveredButtonId: null,
        });
    };
    drawLines = () => {
        let arrRoadmaps = this.state.scholasticsRedux;
        let roadmapBySemester = {};
        // console.log('Clicked Button:', this.state.clickedButtonId);
        // Tạo danh sách phần tử theo semester
        arrRoadmaps.forEach((item, index) => {
            // Kiểm tra xem semester đã tồn tại trong đối tượng chưa
            if (!roadmapBySemester[item.semester]) {
                roadmapBySemester[item.semester] = [];
            }

            // Thêm phần tử vào danh sách của semester
            roadmapBySemester[item.semester].push(item);
        });

        const allCourses = [].concat(...Object.values(roadmapBySemester)); // Lấy tất cả các khóa học từ tất cả các học kì
        const pairsWithSameCredit = [];
        const pairsWithSameCourseId = [];
        const pairsWithSameHPSS = [];
        allCourses.forEach((course, index) => {


            const otherCoursesWithSameCreditAndSameSemester = allCourses.slice(index + 1)
                .filter(otherCourse =>
                    otherCourse.prerequisite === course.credit && otherCourse.semester !== course.semester
                );

            const otherCoursesWithSameCourseId = allCourses.slice(index + 1)
                .filter(otherCourse =>
                    otherCourse.alternativecourse && otherCourse.alternativecourse === course.alternativecourse
                );

            const otherCoursesWithSameHPSS = allCourses.slice(index + 1)
                .filter(otherCourse =>
                    otherCourse.concurrentcourse && otherCourse.concurrentcourse === course.concurrentcourse
                );


            otherCoursesWithSameCreditAndSameSemester.forEach(otherCourse => {
                pairsWithSameCredit.push({ course, otherCourse });
            });

            otherCoursesWithSameCourseId.forEach(otherCourse => {
                pairsWithSameCourseId.push({ course, otherCourse });
            });

            otherCoursesWithSameHPSS.forEach(otherCourse => {
                pairsWithSameHPSS.push({ course, otherCourse });
            });
        });
        const lines = [];
        const texts = [];
        const lines1 = [];
        const texts1 = [];
        const { hoveredButtonId, zIndexCounter } = this.state;

        const drawLine = (x1, y1, x2, y2, lineColor, zIndex, isDashed = false, hasArrow = true) => {
            lines.push(
                <line
                    key={`${x1}-${y1}-${x2}-${y2}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={lineColor}
                    strokeWidth="2"
                    //  strokeDasharray={isDashed ? "5,5" : "none"}
                    strokeDasharray="5,5"
                    markerEnd={hasArrow ? "url(#arrowhead)" : "none"}
                    style={{ zIndex }}
                />
            );

            // Calculate the midpoint of the line
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            // Add a text element at the midpoint
            texts.push(
                <text
                    key={`text-${x1}-${y1}-${x2}-${y2}`}
                    x={midX + 10}
                    y={midY}
                    fill={lineColor}
                    fontSize="12"
                    fontWeight={500}
                    textAnchor="middle"
                    alignmentBaseline="middle"

                >
                    TT
                </text>
            );

        };

        const drawLineHPSS = (x1, y1, x2, y2, lineColor, zIndex, isDashed = false, hasArrow = true) => {
            lines.push(
                <line
                    key={`${x1}-${y1}-${x2}-${y2}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={lineColor}
                    strokeWidth="2"
                    //  strokeDasharray={isDashed ? "5,5" : "none"}
                    strokeDasharray="5,5"
                    markerEnd={hasArrow ? "url(#arrowhead)" : "none"}
                // style={{ zIndex }}
                />
            );

            // Calculate the midpoint of the line
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            // Add a text element at the midpoint
            texts.push(
                <text
                    key={`text-${x1}-${y1}-${x2}-${y2}`}
                    x={midX + 10}
                    y={midY + 10}

                    fontSize="12"
                    fontWeight={500}
                    fill="red"
                    textAnchor="middle"
                    alignmentBaseline="middle"

                >
                    SH
                </text>
            );

        };

        pairsWithSameCredit.forEach(pair => {

            const button1 = document.getElementById(`button-${pair.course.id}`);
            const button2 = document.getElementById(`button-${pair.otherCourse.id}`);
            if (button1 && button2) {

                const rect1 = button1.getBoundingClientRect();
                const rect2 = button2.getBoundingClientRect();


                //const isHoveredButton2 = this.state.isMouseOver && this.state.hoveredButtonId === `button-${pair.course.id}`;

                const isHoveredButton1 = hoveredButtonId === `button-${pair.course.id}`;
                const isHoveredButton2 = hoveredButtonId === `button-${pair.otherCourse.id}`;

                // Tính toán màu sắc dựa trên trạng thái của button
                const lineColor = isHoveredButton1 || isHoveredButton2 ? "#ff0000" : "#636b6a61";
                const Color = isHoveredButton1 || isHoveredButton2 ? "#111111" : "#636b6a61";
                const yourThreshold = 200;
                // Xác định xem hai button có nằm trong hai cột gần nhau hay không
                const isSameColumn = Math.abs(rect1.left - rect2.left) < yourThreshold; // Thay yourThreshold bằng ngưỡng bạn muốn
                let x1, y1, x2, y2, x3, y3, x4, y4;
                if (isSameColumn) {
                    // Tính toán điểm nối giữa hai button
                    x1 = rect1.left + rect1.width / 2;
                    y1 = (rect1.top + rect1.bottom) / 2;
                    x2 = rect2.left + rect2.width / 2;
                    y2 = (rect2.top + rect2.bottom) / 2;

                    // Tính toán điểm nối ở giữa trái phải của button1 và trên dưới của button2
                    x3 = (x1 + x2) / 2;
                    y3 = (rect1.top + rect1.bottom) / 2;
                    x4 = (x1 + x2) / 2;
                    y4 = (rect2.top + rect2.bottom) / 2;
                    // console.log('One or both:', rect1.top);
                } else {
                    // Tính toán điểm nối giữa hai button
                    x1 = rect1.left + rect1.width / 2 + 60;
                    y1 = (rect1.top + rect1.bottom) / 2;
                    x2 = rect2.left + rect2.width / 2;
                    y2 = (rect2.top + rect2.bottom) / 2 + 28;

                    // Đường dọc đầu tiên
                    x3 = rect1.right + 20;
                    y3 = (rect1.top + rect1.bottom) / 2;
                    x4 = x2;
                    y4 = rect2.bottom + 20;
                }
                // Kiểm tra xem đoạn thẳng có cắt qua các button không
                const isIntersecting = (
                    this.isLineIntersectingButton({ x: x1, y: y1 }, { x: x3, y: y3 }, button1, button2) ||
                    this.isLineIntersectingButton({ x: x2, y: y2 }, { x: x4, y: y4 }, button1, button2)
                );
                if (isHoveredButton1 || isHoveredButton2) {
                    if (isSameColumn) {
                        // Nếu không cắt qua bất kỳ button nào, thêm đoạn thẳng vào danh sách
                        if (!isIntersecting) {
                            // Tạo đoạn thẳng từ x1, y1 đến x3, y3 (đoạn thẳng ngang)
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-1`}
                                    x1={x1 + 60}
                                    y1={y1}
                                    x2={x3}
                                    y2={y3}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );

                            // Tạo đoạn thẳng từ x3, y3 đến x4, y4 (đoạn thẳng dọc)
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-2`}
                                    x1={x3}
                                    y1={y3}
                                    x2={x4}
                                    y2={y4}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );
                            // Tạo mũi tên chỉ vào button2
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-arrow`}
                                    x1={x4}
                                    y1={y4}
                                    x2={x2 - 70}
                                    y2={y2}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    markerEnd="url(#arrowhead)"  // Thêm mũi tên
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );
                        }
                    } else {
                        // Nếu không cắt qua bất kỳ button nào, thêm đoạn thẳng vào danh sách
                        if (!isIntersecting) {


                            // Tạo đoạn thẳng từ x1, y1 đến x3, y3 (đoạn thẳng ngang)
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-1`}
                                    x1={x1}
                                    y1={y1}
                                    x2={x3}
                                    y2={y3}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );



                            // Tạo đoạn thẳng từ x4, y4 đến x2, y2 (đoạn thẳng ngang)
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-arrow`}
                                    x1={x4}
                                    y1={y4}
                                    x2={x2}
                                    y2={y2 + 10}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    markerEnd="url(#arrowhead)"  // Thêm mũi tên
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );


                            // Tạo đoạn thẳng từ x3, y3 đến x4, y4 (đoạn thẳng dọc)
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-5`}
                                    x1={x3}
                                    y1={y3}
                                    x2={x3}
                                    y2={y4}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );

                            // Tạo đoạn thẳng từ x4, y4 đến x2, y2 (đoạn thẳng ngang)
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-6`}
                                    x1={x3}
                                    y1={y4}
                                    x2={x2}
                                    y2={y4}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );

                        }
                    }
                } else {
                    if (isSameColumn) {
                        // Nếu không cắt qua bất kỳ button nào, thêm đoạn thẳng vào danh sách
                        if (!isIntersecting) {
                            // Tạo đoạn thẳng từ x1, y1 đến x3, y3 (đoạn thẳng ngang)
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-1`}
                                    x1={x1 + 60}
                                    y1={y1}
                                    x2={x3}
                                    y2={y3}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    strokeDasharray="5,5" // Thiết lập nét đứt
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );

                            // Tạo đoạn thẳng từ x3, y3 đến x4, y4 (đoạn thẳng dọc)
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-2`}
                                    x1={x3}
                                    y1={y3}
                                    x2={x4}
                                    y2={y4}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    strokeDasharray="5,5" // Thiết lập nét đứt
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );
                            // Tạo mũi tên chỉ vào button2
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-arrow`}
                                    x1={x4}
                                    y1={y4}
                                    x2={x2 - 70}
                                    y2={y2}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    strokeDasharray="5,5" // Thiết lập nét đứt
                                    markerEnd="url(#arrowhead)"  // Thêm mũi tên
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );
                        }
                    } else {
                        // Nếu không cắt qua bất kỳ button nào, thêm đoạn thẳng vào danh sách
                        if (!isIntersecting) {


                            // Tạo đoạn thẳng từ x1, y1 đến x3, y3 (đoạn thẳng ngang)
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-1`}
                                    x1={x1}
                                    y1={y1}
                                    x2={x3}
                                    y2={y3}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    strokeDasharray="5,5" // Thiết lập nét đứt
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );



                            // Tạo đoạn thẳng từ x4, y4 đến x2, y2 (đoạn thẳng ngang)
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-arrow`}
                                    x1={x4}
                                    y1={y4}
                                    x2={x2}
                                    y2={y2 + 10}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    strokeDasharray="5,5" // Thiết lập nét đứt
                                    markerEnd="url(#arrowhead)"  // Thêm mũi tên
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );


                            // Tạo đoạn thẳng từ x3, y3 đến x4, y4 (đoạn thẳng dọc)
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-5`}
                                    x1={x3}
                                    y1={y3}
                                    x2={x3}
                                    y2={y4}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    strokeDasharray="5,5" // Thiết lập nét đứt
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );

                            // Tạo đoạn thẳng từ x4, y4 đến x2, y2 (đoạn thẳng ngang)
                            lines.push(
                                <line
                                    key={`${pair.course.id}-${pair.otherCourse.id}-6`}
                                    x1={x3}
                                    y1={y4}
                                    x2={x2}
                                    y2={y4}
                                    stroke={lineColor}  // Thêm màu sắc dựa trên trạng thái chuột
                                    strokeWidth="2"
                                    strokeDasharray="5,5" // Thiết lập nét đứt
                                    style={{ zIndex: zIndexCounter }}
                                />
                            );

                        }
                    }
                }
            }

        });


        pairsWithSameCourseId.forEach(pair => {
            const button1 = document.getElementById(`button-${pair.course.id}`);
            const button2 = document.getElementById(`button-${pair.otherCourse.id}`);
            if (button1 && button2) {
                // Calculate the coordinates and draw the line
                const rect1 = button1.getBoundingClientRect();
                const rect2 = button2.getBoundingClientRect();

                const x1 = rect1.left + rect1.width / 2;
                const y1 = rect1.bottom;
                const x2 = rect2.left + rect2.width / 2;
                const y2 = rect2.top;
                let isFirstButtonColored = false;
                drawLine(x1, y1, x2, y2, "rgb(0 69 155)", '1', false, true);




                // Thêm class cho button nếu điều kiện thỏa mãn
                if (pair.course.alternativecourse === pair.otherCourse.alternativecourse) {
                    button1.classList.add("gray-button");
                    button2.classList.add("green-button");
                }
            }
        });

        pairsWithSameHPSS.forEach(pair => {
            const button1 = document.getElementById(`button-${pair.course.id}`);
            const button2 = document.getElementById(`button-${pair.otherCourse.id}`);
            if (button1 && button2) {
                // Calculate the coordinates and draw the line
                const rect1 = button1.getBoundingClientRect();
                const rect2 = button2.getBoundingClientRect();

                const x1 = rect1.left + rect1.width / 2;
                const y1 = rect1.bottom;
                const x2 = rect2.left + rect2.width / 2;
                const y2 = rect2.top;
                let isFirstButtonColored = false;
                drawLineHPSS(x1, y1, x2, y2, "rgb(0 69 155)", '1', false, true);




                // Thêm class cho button nếu điều kiện thỏa mãn
                if (pair.course.concurrentcourse === pair.otherCourse.concurrentcourse) {
                    button1.classList.add("gray-button");
                    button2.classList.add("green-button");
                }
            }
        });
        // // In danh sách cặp khóa học có cùng credit vào console
        // console.log('Pairs with Same Credit:', pairsWithSameCredit);

        // In các đoạn thẳng được vẽ vào console
        // console.log('Lines:', lines);

        return (
            <svg>
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="5"  // Điều chỉnh chiều rộng của mũi tên
                        markerHeight="4"  // Điều chỉnh chiều cao của mũi tên
                        refX="0"
                        refY="2"
                        orient="auto"

                    >
                        <polygon points="0 0, 5 2, 0 4" />  {/* Điều chỉnh kích thước và hình dạng của mũi tên */}
                    </marker>
                </defs>
                {lines.map((line, index) => (
                    <g key={index}>
                        {line}
                    </g>
                ))}
                {texts.map((text, index) => (
                    <g key={index}>
                        {text}
                    </g>
                ))}
            </svg>
        );
    };

    // Kiểm tra xem đoạn thẳng có cắt qua button không
    isLineIntersectingButton = (point1, point2, button1, button2) => {
        const buttons = document.querySelectorAll('.your-button-class'); // Thay thế '.your-button-class' bằng class của các button

        for (const button of buttons) {
            if (button !== button1 && button !== button2) {
                const rect = button.getBoundingClientRect();
                const minX = Math.min(point1.x, point2.x);
                const minY = Math.min(point1.y, point2.y);
                const maxX = Math.max(point1.x, point2.x);
                const maxY = Math.max(point1.y, point2.y);

                if (
                    rect.left < maxX &&
                    rect.right > minX &&
                    rect.top < maxY &&
                    rect.bottom > minY
                ) {
                    return true; // Đoạn thẳng cắt qua một button khác
                }
            }
        }

        return false; // Đoạn thẳng không cắt qua bất kỳ button nào trừ button1 và button2
    };


    render() {
        let { detailScholastic, localTotalCourses, localTotalCredits } = this.state;
        let arrRoadmaps = this.state.scholasticsRedux;
        // let listroadmaps = this.state.roadmapsRedux;

        let roadmapBySemester = {};

        // Tạo danh sách phần tử theo semester
        arrRoadmaps.forEach((item, index) => {
            // Kiểm tra xem semester đã tồn tại trong đối tượng chưa
            if (!roadmapBySemester[item.semester]) {
                roadmapBySemester[item.semester] = [];
            }

            // Thêm phần tử vào danh sách của semester
            roadmapBySemester[item.semester].push(item);
        });

        let courses = this.props.courses;
        let roadmap = this.props.roadmap;


        // const { totalCredits, totalCourses } = this.state;
        // Xuất tổng số học kỳ và tổng số tín chỉ
        const semesters = Object.keys(roadmapBySemester);
        const maxCoursesInSemester = Math.max(...semesters.map(semester => roadmapBySemester[semester].length));

        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div class="container" style={{ width: '1355px', height: '1000px', marginTop: '20px' }}>
                    <h1 style={{ fontWeight: '700' }}>Chương trình đào tạo ngành CNTT trường Đại học Công Nghệ TP.HCM</h1>
                    <h5 style={{
                        fontStyle: 'italic',
                        textAlign: 'center',
                        // marginBottom: '20px',
                        fontWeight: '600',
                    }}>Áp dụng cho khóa tuyển sinh {detailScholastic.scholastic}</h5>
                    <table >
                        <thead>
                            <tr >

                                {Object.keys(roadmapBySemester).map((semester, semesterIndex) => (

                                    <th key={semesterIndex} style={{
                                        textAlign: 'center', ...(semester === '8' && {

                                            borderBottom: '3px solid #0000009e',
                                            // Thêm các thuộc tính CSS khác cho cột học kỳ 8 nếu cần
                                        }),
                                    }}>Học kì {semester}
                                        {semester === '8' && (
                                            <div style={{ top: '21.5%', left: '85%', position: 'absolute', transform: 'translateX(-50%)' }}>
                                                <button
                                                    style={{
                                                        width: '199px',
                                                        height: '30px',
                                                        backgroundColor: 'rgb(89 109 114 / 37%)',
                                                        border: '2px solid #0111111',
                                                        color: '#111111',
                                                        fontWeight: '600',

                                                    }}
                                                >
                                                    Tự chọn 1 trong 4 nhóm
                                                </button>
                                            </div>
                                        )}
                                        {semester === '8' && (
                                            <div style={{ position: 'relative', width: '265px' }}>
                                                <div style={{
                                                    width: '265px',
                                                    height: '593px',
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    marginTop: '522px',
                                                    borderTop: '3px solid #0000009e',
                                                    borderBottom: '3px solid #0000009e',

                                                }}>
                                                    <div style={{
                                                        width: '265px',
                                                        height: '2px',
                                                        background: '#0000009e',
                                                        position: 'absolute',
                                                        top: '33.33%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                    }}>


                                                    </div>
                                                    <div style={{
                                                        width: '265px',
                                                        height: '2px',
                                                        background: '#0000009e',
                                                        position: 'absolute',
                                                        top: '66.66%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                    }}></div>
                                                </div>
                                            </div>

                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {Array.from({ length: maxCoursesInSemester }, (_, subIndex) => (
                                <tr key={subIndex} style={{ height: '102px', }}>
                                    {semesters.map((semester, semesterIndex) => {
                                        const isSemester8 = semester === '8'; // Kiểm tra nếu là học kỳ 8
                                        const subItem = roadmapBySemester[semester][subIndex];
                                        const columnStyle = {
                                            borderLeft: isSemester8 && subIndex <= 7 ? '3px solid #0000009e' : 'none', // Thêm border nếu là học kỳ 8
                                            borderRight: isSemester8 && subIndex <= 7 ? '3px solid #0000009e' : 'none',
                                            // height: isSemester8 ? '60px' : 'auto',
                                            //   borderBottom: isSemester8 && subIndex === 9 ? '3px solid #0000009e' : 'none',
                                            //   borderBottom: isSemester8 ? 'none' : null,
                                            //  borderTop: isSemester8 && subIndex !== 9 ? 'none' : null,
                                            height: isSemester8 ? '50px' : 'auto',

                                        };

                                        if (subItem) {
                                            const course = courses.find(course => course.id === subItem.courseId);
                                            const courseName = course ? course.nameCourse : "Không tìm thấy";
                                            const credit = course ? course.tantamount : "Không tìm thấy";
                                            const lecturers = course ? course.lecturers : "Không tìm thấy";
                                            const courseId = course ? course.id : "Không tìm thấy";
                                            // console.log('courseId:', subItem.courseId);
                                            const buttonStyle = {
                                                // ... Các thuộc tính CSS khác ...
                                                width: isSemester8 ? '220px' : '120px', // Điều chỉnh width cho học kỳ 8
                                                height: isSemester8 ? '45px' : '60px', // Điều chỉnh height cho học kỳ 8
                                                //  border: isSemester8 ? '2px solid red' : (credit === 3 ? '2px solid #0cb2f1' : '2px solid rgb(239 0 255 / 73%)'),

                                            };
                                            // Thêm xử lý hiển thị cho học kỳ 8
                                            const lecturer = course ? course.lecturers : null;
                                            const lecturerGroupStyle = lecturer ? { border: isSemester8 ? '3px solid #0000009e' : null, width: isSemester8 ? '200px' : null, borderBottom: 'none', } : {};
                                            const lineStyle = {
                                                width: '103px', // Đặt chiều dài của đường thẳng
                                                height: '2px', // Đặt chiều cao của đường thẳng (có thể điều chỉnh theo ý muốn)
                                                background: 'black', // Màu của đường thẳng
                                            };
                                            return (
                                                <td key={semesterIndex} style={{
                                                    textAlign: 'center', position: 'relative', ...columnStyle,
                                                    // ...(subItem.semester === 8 && subIndex === 1 ? { borderBottom: '3px solid #0000009e' } : {}),

                                                }}>
                                                    <Link to={`/detail-course/${courseId}`}>
                                                        <button
                                                            id={`button-${subItem.id}`}

                                                            style={{
                                                                padding: '16px 5px', cursor: 'pointer', fontSize: '10px', fontWeight: '600', width: '120px',
                                                                height: '60px',
                                                                display: 'flex',
                                                                ...buttonStyle,
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                justifyContent: 'center', // Căn giữa theo chiều dọc
                                                                backgroundColor: credit === 3 ? '#7ce1ff5e' : 'rgb(253 10 201 / 21%)',
                                                                color: '#013960',
                                                                border: credit === 3 ? '2px solid #0cb2f1' : '2px solid rgb(239 0 255 / 73%)',
                                                                position: 'relative',

                                                                // marginTop: subItem.semester === 8 && subIndex !== 0 ? '-60px' : null,
                                                                ...(subItem.semester === 8 && subIndex === 0 ? { marginTop: '30px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 1 ? { marginTop: '-72px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 2 ? { marginTop: '-128px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 3 ? { marginTop: '-184px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 4 ? { marginTop: '-228px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 5 ? { marginTop: '-284px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 6 ? { marginTop: '-340px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 7 ? { marginTop: '-396px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 8 ? { marginTop: '-440px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 9 ? { marginTop: '-496px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 10 ? { marginTop: '-552px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 11 ? { marginTop: '-607px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 12 ? { marginTop: '-650px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 13 ? { marginTop: '-706px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 14 ? { marginTop: '-761px' } : {}),
                                                                ...(subItem.semester === 8 && subIndex === 15 ? { marginTop: '-816px' } : {}),
                                                                // ...(subItem.semester === 8 && subIndex === 16 ? { marginTop: '-485px' } : {}),
                                                            }}

                                                            onMouseOver={() => this.handleMouseOver(`button-${subItem.id}`)}
                                                            onMouseOut={this.handleMouseOut}
                                                        >
                                                            <div className='MaHP' style={{
                                                                width: '100%',
                                                                //  maxWidth: '112px',
                                                                minWidth: '112px',
                                                                position: 'absolute',
                                                                top: '0',
                                                                // left: '25px',
                                                                fontSize: '11px',
                                                                fontWeight: '600',
                                                                borderBottom: '1px dashed rgb(0 0 0 / 48%)', // Đường đứt màu đen
                                                                paddingRight: '7px',
                                                                paddingLeft: '7px',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                position: 'absolute',
                                                            }}>
                                                                <span

                                                                >
                                                                    {subItem.credit} {/* Hiển thị mã HP ở góc trên trái */}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        minWidth: '8px',
                                                                        marginLeft: '48px'
                                                                    }}
                                                                >
                                                                    {credit} {/* Hiển thị tín chỉ ở góc trên phải */}
                                                                </span>
                                                            </div>

                                                            <div className='namecourse' style={{ height: '30px', width: '100%', marginTop: '25px' }}>

                                                                <p style={{

                                                                    webkitLineClamp: subItem.semester === 8 ? '1' : '2',
                                                                    fontSize: '11px',
                                                                }}>{courseName}</p>
                                                            </div>


                                                        </button>
                                                    </Link>
                                                </td>
                                            );
                                        } else {
                                            // Nếu không có khóa học cho học kì này, hiển thị cell trống
                                            return <td key={semesterIndex}></td>;
                                        }

                                    })}

                                </tr>

                            ))}
                            <svg style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: '-1' }}>
                                {this.drawLines()}
                            </svg>

                        </tbody>

                    </table>

                </div>
                {/* 
                <HomeFooter isShowBanner={false} /> */}

            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        scholastics: state.admin.scholastics,
        userInfo: state.user.userInfo,
        listUsers: state.admin.users,
        roadmap: state.admin.roadmap,
        courses: state.admin.courses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRoadmapRedux: (id) => dispatch(actions.fetchARoadmapsStart(id)),
        fetchScholasticRedux: (scholasticId) => dispatch(actions.fetchAScholasticsStart(scholasticId)),
        fetchUserRedux: (userId) => dispatch(actions.fetchAUsersStart(userId)),
        fetchCourseRedux: () => dispatch(actions.fetchAllCoursesStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Roadmap);
