import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MonacoEditor from '@monaco-editor/react';

export default function ProblemDetail() {
    const { problemId } = useParams();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    // Your C++ code here
    cout << "Hello World!" << endl;
    return 0;
}`);
    const [output, setOutput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isReviewing, setIsReviewing] = useState(false);
    const [customInput, setCustomInput] = useState('');


    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await fetch(`http://localhost:4000/problem/getProblem/${problemId}`);
                const data = await response.json();
                if (data.success) {
                    setProblem(data.problem);
                } else {
                    console.error('Failed to load problem');
                }
            } catch (err) {
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, [problemId]);

    const handleReview = async () => {
        // Logic to just run the code without saving
        setIsReviewing(true);
        try {
            const response = await fetch('http://localhost:4000/ai-review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code
                })
            });
            const result = await response.json();
            setOutput(result.review || result.error);
        } catch (err) {
            setOutput('Error connecting to server');
        } finally {
            setIsReviewing(false);
        }
    };

    const handleRun = async () => {
        // Logic to just run the code without saving
        setIsRunning(true);
        try {
            const response = await fetch('http://localhost:4000/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: 'cpp',
                    code,
                    input: customInput
                })
            });
            const result = await response.json();
            setOutput(result.output || result.error);
        } catch (err) {
            setOutput('Error connecting to server');
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:4000/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    problemId,
                    code,
                    language: 'cpp',
                    userId: localStorage.getItem("userId") 
                })
            });
            const result = await response.json();
            setOutput(result.verdict || result.error);
        } catch (err) {
            setOutput('Error connecting to server');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading problem...</div>;
    }

    if (!problem) {
        return (
            <div style={styles.container}>
                <p>Problem not found</p>
                <Link to="/problems">Back to problems</Link>
            </div>
        );
    }

    return (
        <div style={styles.problemDetailContainer}>
            {/* Problem Description Panel */}
            <div style={styles.problemPanel}>
                <div style={styles.header}>
                    <Link to="/problems" style={styles.backLink}>← Back to Problems</Link>
                    <div style={styles.problemHeader}>
                        <h1 style={styles.problemTitle}>{problem.name}</h1>
                    </div>
                </div>

                <div style={styles.problemContent}>
                    <p style={styles.description}>{problem.problemStatement}</p>

                    <h3 style={styles.sectionTitle}>Test Cases:</h3>
                    {problem.testCases && problem.testCases.length > 0 ? (
                        problem.testCases.map((testCase, index) => (
                            <div key={testCase._id || index} style={styles.exampleContainer}>
                                <div style={styles.exampleSection}>
                                    <p style={styles.exampleLabel}>Input:</p>
                                    <pre style={styles.example}>{testCase.input}</pre>
                                </div>
                                <div style={styles.exampleSection}>
                                    <p style={styles.exampleLabel}>Output:</p>
                                    <pre style={styles.example}>{testCase.output}</pre>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No test cases available.</p>
                    )}

                    <p style={{ marginTop: '30px', fontStyle: 'italic', fontSize: '13px', color: '#666' }}>
                        Created by: {problem.createdBy}
                    </p>
                </div>
            </div>

            {/* Code Editor Panel */}
            <div style={styles.editorPanel}>
                <div style={styles.editorHeader}>
                    <div style={styles.languageInfo}>
                        <span style={styles.languageLabel}>Language:</span>
                        <span style={styles.languageValue}>C++</span>
                    </div>

                    <div style={styles.buttonGroup}>
                        <button
                            onClick={handleReview}
                            style={styles.submitButton}
                            disabled={isReviewing}
                        >
                            {isReviewing ? 'Reviewing...' : 'AI Review'}
                           
                        </button>

                        <button
                            onClick={handleRun}
                            style={{ ...styles.submitButton, marginLeft: '10px' }}
                            disabled={isRunning}
                        >
                            {isRunning ? 'Running...' : 'Run'}
                            
                        </button>

                        <button
                            onClick={handleSubmit}
                            style={{ ...styles.submitButton, marginLeft: '10px' }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>

                <MonacoEditor
                    height="60vh"
                    language="cpp"
                    value={code}
                    onChange={setCode}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                    }}
                />



                <div style={styles.outputPanel}>
                    <h3 style={styles.outputTitle}>Output:</h3>
                    <pre style={styles.outputContent}>{output || 'Your output will appear here'}</pre>
                </div>

                <div style={styles.inputBoxContainer}>
                    <h3 style={styles.outputTitle}>Custom Input:</h3>
                    <textarea
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="Enter custom input here"
                        style={styles.inputBox}
                        rows={1}
                    />
                </div>

            </div>
        </div>
    );
}

const styles = {
    problemDetailContainer: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
    },
    problemPanel: {
        flex: 5,
        overflowY: 'auto',
        padding: '20px',
        backgroundColor: '#fff',
    },
    editorPanel: {
        flex: 5,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1e1e1e',
    },
    header: {
        marginBottom: '20px',
    },
    backLink: {
        display: 'inline-block',
        marginBottom: '15px',
        color: '#1976d2',
        textDecoration: 'none',
        fontSize: '0.9rem',
    },
    problemHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '15px',
    },
    problemTitle: {
        fontSize: '24px',
        margin: 0,
        color: '#333',
    },
    problemContent: {
        lineHeight: '1.6',
        color: '#444',
        fontSize: '15px',
    },
    description: {
        marginBottom: '25px',
    },
    sectionTitle: {
        fontSize: '18px',
        color: '#333',
        margin: '20px 0 10px 0',
    },
    exampleContainer: {
        display: 'flex',
        gap: '20px',
        marginBottom: '15px',
    },
    exampleSection: {
        flex: 5,
    },
    exampleLabel: {
        fontWeight: 'bold',
        margin: '0 0 5px 0',
        fontSize: '14px',
    },
    example: {
        backgroundColor: '#f8f9fa',
        padding: '12px',
        borderRadius: '4px',
        fontSize: '14px',
        overflowX: 'auto',
        margin: 0,
        fontFamily: 'monospace',
    },
    editorHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        backgroundColor: '#2d2d2d',
    },
    languageInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    languageLabel: {
        color: '#aaa',
        fontSize: '14px',
    },
    languageValue: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
    },
    submitButton: {
        padding: '8px 20px',
        backgroundColor: '#3a86ff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        transition: 'background-color 0.2s',
    },
    outputPanel: {
        backgroundColor: '#252526',
        color: '#d4d4d4',
        padding: '15px',
        borderTop: '1px solid #454545',
        height: '12vh',
        overflowY: 'auto',
    },
    outputTitle: {
        margin: '0 0 10px 0',
        color: '#9cdcfe',
        fontSize: '16px',
    },
    outputContent: {
        whiteSpace: 'pre-wrap',
        margin: 0,
        fontFamily: 'monospace',
        fontSize: '14px',
        lineHeight: '1.5',
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '20px',
    },
    buttonGroup: {
        display: 'flex',
        alignItems: 'center',
    },
    inputBoxContainer: {
        padding: '12px 20px',
        backgroundColor: '#1e1e1e',
        borderTop: '1px solid #444',
    },
    inputBox: {
        width: '100%',
        backgroundColor: '#2d2d2d',
        color: '#fff',
        border: '1px solid #444',
        borderRadius: '4px',
        padding: '10px',
        fontFamily: 'monospace',
        fontSize: '14px',
        resize: 'vertical',
    }
};
